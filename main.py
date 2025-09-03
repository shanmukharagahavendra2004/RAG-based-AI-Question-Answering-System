from fastapi import FastAPI, Request
import shutil
from pathlib import Path
from fastapi import FastAPI,UploadFile,File
import extract_service
import chunk_service
import embeddings_service
import vector_service
import numpy as np
from openai import OpenAI
from transformers import pipeline
from fastapi import Body
from pydantic import BaseModel



app=FastAPI()
UPLOAD_DIR=Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@app.post("/upload")
async def upload_file(file:UploadFile=File(...)):
    try:
        file_path=UPLOAD_DIR/ file.filename
        with open(file_path,"wb") as buffer:
            shutil.copyfileobj(file.file,buffer)
        extract_result=extract_service.extract_text(file_path)
        chunk=chunk_service.chunk_text(extract_result)
        unique_chunks=list(dict.fromkeys(chunk))
        embeddings=[embeddings_service.get_embedding(text) for text in chunk if text.strip()]
        vector_service.store_embeddings(embeddings,chunk)

        return {"filename":file.filename, "path":str(file_path),"text_preview":extract_result[:20],
                "chunks":chunk[:5],
                "embeddings":embeddings[:5]}
    except Exception as e:
        return {"error":str(e)}

@app.get("/search")
async def search(data: dict=Body(...)):
    query=data.get("query")
    if not query:
        return {"error":"Query not provided"}
    query_vector=embeddings_service.get_embedding(query)
    D, I=vector_service.index.search(np.array([query_vector], dtype="float32"),k=5)
    results=[]
    seen=set()
    for i in I[0]:
        if vector_service.metadata[i] not in seen:
            results.append(vector_service.metadata[i])
            seen.add(vector_service.metadata[i])
    return {"results":results}

generator=pipeline("text-generation",model="gpt2")

class QueryRequest(BaseModel):
    query: str
@app.post("/chat")
async def chat(request: QueryRequest):
    query=request.query
    print(query)
   
    if not query:
        return {"error":"Query not provided"}
    query_vector=embeddings_service.get_embedding(query)
    D, I=vector_service.index.search(np.array([query_vector],dtype="float32"),k=5)
    retrieved_chunks=[vector_service.metadata[i] for i in I[0]]
    context="\n\n".join(retrieved_chunks)

    
    prompt=f"Answer the question using the context below:\n\n\nContext:\n{context}\n\nQuestion:{query}\nAnswer:"
    result=generator(prompt,max_length=300,do_sample=True)[0]["generated_text"]
    return {"answer":result}
