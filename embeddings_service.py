from sentence_transformers import SentenceTransformer
model=SentenceTransformer('all-MiniLM-L6-v2')
def get_embedding(text):
    if isinstance(text,str):
        texts=[text]
    elif isinstance(text,list):
        texts=text
    else:
        raise ValueError("Input must be a string or a list of strings.")
    
    embeddings=model.encode(texts)
    if isinstance(text, str):
        return embeddings[0].tolist()
    return [e.tolist() for e in embeddings]
