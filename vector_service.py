import faiss
import numpy as np
import os
import pickle


INDEX_FILE="vector_index.faiss"
META_FILE="metadata.pkl"

if os.path.exists(INDEX_FILE):
    index=faiss.read_index(INDEX_FILE)
    with open(META_FILE,"rb") as f:
        metadata=pickle.load(f)
else:
    index=faiss.IndexFlatL2(384)
    metadata=[]

def store_embeddings(embeddings,chunks):
    global index,metadata
    vectors=np.array(embeddings).astype("float32")
    index.add(vectors)
    metadata.extend(chunks)
    faiss.write_index(index,INDEX_FILE)
    with open(META_FILE,"wb") as f:
        pickle.dump(metadata,f)

def search_embeddings(query_vector,k=5):
    query_vector=np.array([query_vector],dtype="float32")
    distances,indices=index.search(query_vector,k)
    results=[metadata[i] for i in indices[0]]
    return results

