import React,{useState} from 'react'
import axios from 'axios'
const Chat = () => {
    const [file,setFile]=useState(null);
    const [query,setQuery]=useState("");
    
    const [students,setStudents]
    =useState({all:[]});
    

    const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!query && !file)
    {
      alert("Please enter a query or upload a file");
      return;
    }
    else if(!query && file)
    {
      const formData=new FormData();
      formData.append("file",file);
      await axios.post("http://localhost:9090/upload",formData,{headers:{"Content-Type":"multipart/form-data"}});
    }
    else if(query && !file)
    {
       await axios.post("http://localhost:9090/query",{query:query},
        {headers:{"Content-Type":"application/json"}}).then((res)=>{
          setStudents(prev=>({
            all:[...prev.all,{question:query,answer:res.data.answer}]
          }))
       
       })
    }
    else if(query && file)
    {
       const formData=new FormData();
      formData.append("file",file);
      await axios.post("http://localhost:9090/upload",formData,{headers:{"Content-Type":"multipart/form-data"}});

      await axios.post("http://localhost:9090/query",{query:query},{headers:{"Content-Type":"application/json"}})
    }

    }
  return (
    <div className="flex flex-col justify-center items-center   p-3">
      <div className="m-36">
     <ul>
      {
        students.all.map((student,index)=>(
          
            <div key={index}>

              {
                Object.entries(student).map(([key,value])=>(
                  <div className="flex flex-col p-2 mb-5" key={key}>
                    <div className="flex justify-end mr-30">
                    <li className="flex justify-start text-white text-xl rounded-full  bg-violet-950 w-auto  p-2 px-5  text-wrap text-justify mb-6">{student.question}</li>
                    </div>
                   <li className="text-wrap text-justify text-white text-x"> {student.answer}</li>
                  </div>
                ))

              }
           
            </div>
          
        ))

      }
    </ul>
        <form onSubmit={handleSubmit} className="flex bottom-5 p-2 border-2 border-blue-800 rounded-xl h-12 w-[60%] mt-10 bg-black">
        <input className="w-[20%] bg-black" type="file" onChange={(e)=>{setFile(e.target.files[0])}}/>
        <input contentEditable="true" className="border-none outline-none w-[75%] bg-black text-white"  type="text" value={query} onChange={(e)=>{
          setQuery(e.target.value)
        }} placeholder="Ask Anything"/>
        <button className="w-[20%] bg-blue text-white" type="submit">Submit</button>
        </form>
        </div>
    </div>
  )
}

export default Chat