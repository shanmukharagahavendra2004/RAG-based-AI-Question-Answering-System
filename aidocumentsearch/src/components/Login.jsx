import React,{useState} from 'react'
import axios from 'axios';

const Login = () => {
  const [id,setId]=useState("");
  const [password,setPassword]=useState("");


  const loginData={
    userName:id,
    password:password,
    
  }
  const login=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:9090/login",loginData)

    .then(response=>{
      console.log("Success",response.data)
    })
    .catch(error=>{
      console.error("Error")
    })


  }
  return (
    <div className="bg-slate-900 flex flex-col items-center h-screen">
      
      <form onSubmit={login} className="flex flex-col items-center justify-center mt-[10%] gap-8">
        
        <input className="border border-black w-72 h-12 focus:border-blue-400 outline-none" type="text" placeholder=" Username or Email" value={id} onChange={(e)=>{
          setId(e.target.value)
        }}/>

         

        <input className="border border-black w-72 h-12 focus:border-blue-400 outline-none" type="password" placeholder=" Password" value={password} onChange={(e)=>{
          setPassword(e.target.value)}}/>

          <button className=" border border-black w-72 h-12 font-bold bg-blue-500 text-white" type="submit">Login</button>
          

      </form>

    </div>
  )
}

export default Login