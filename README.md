1.📖 Chatbot with FastAPI, Hugging Face API & Spring Boot

This project is a hybrid chatbot system that uses:
- **FastAPI** (Python) for document upload, embeddings, and Hugging Face API calls.  
- **Spring Boot** (Java) for backend REST services and integration with the frontend.  
- **React.js** for the frontend UI.



🚀 Features
- Upload documents (PDF/TXT/DOCX).
- Extract, chunk, and embed text for vector similarity search.
- Ask questions and get responses powered by Hugging Face models.
- Use **Spring Boot services** for additional backend APIs or business logic.
- React frontend for user-friendly interaction.




2. Create virtual environment
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

3.Install dependencies
  pip install -r requirements.txt

4.Running the Backend :
-uvicorn chat:app --reload --host 0.0.0.0 --port 9090

5.🔑 Hugging Face API Setup
      Get a free API key from Hugging Face
      Save it as an environment variable:
      export HF_API_KEY="your_hf_api_key"

6.Spring Boot Setup  
   1. Navigate to Spring Boot project
      cd spring-boot-backend

   2. Build with Maven
      mvn clean install

   3. Run Spring Boot
      mvn spring-boot:run

7.💻 Frontend :
     npm start

