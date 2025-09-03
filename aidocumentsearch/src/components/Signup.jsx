import React,{useState} from 'react'
import axios from 'axios';
import Login from './Login.jsx';

const Signup = () => {
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [login,setLogin]=useState(false);

    const signupData={
      userName:userName,
      email:email,
      password:password


    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      axios.post("http://localhost:9090/register",signupData)

      .then(response=>{
        console.log(response.data);
        if(response.data==="success")
          setLogin(true);
      })
      .catch(error=>{
        console.error("Error")
      })


    }

  return (
    
    <div className="bg-slate-900 flex flex-col items-center h-screen">
      {!login?(
        <form onSubmit={handleSubmit}className="flex flex-col items-center justify-center mt-[10%]  gap-8">
            <input className="border border-black w-72 h-12 focus:border-blue-400 outline-none" type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}}placeholder=" Name"/>

            <input className="border border-black w-72 h-12 focus:border-blue-400 outline-none" type="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder=" enter your email"/>

            <input className="border border-black w-72 h-12 focus:border-blue-400 outline-none" type="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}placeholder=" enter your password"/>
            <button type="submit" className="border-2 border-grey w-72 h-10 font-bold bg-blue-500 text-white">Sign up</button>
        </form>):(
          <Login />

        )}





        
    


    </div>
  )
}

export default Signup