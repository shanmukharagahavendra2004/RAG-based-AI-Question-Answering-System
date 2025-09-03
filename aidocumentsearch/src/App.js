import './App.css';
import React from 'react';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Signup from './components/Signup'
import Login from './components/Login';
import Chat from './components/Chat';
import TitleBar from './components/TitleBar.jsx';
function App() {
  return (
     
    <div className="bg-slate-900"> 
     <BrowserRouter>
    <div className="">
      <div className="bg-lime-100 text-center  font-extrabold p-3 flex gap-4 items-center justify-center sticky">
          <h1 className="text-centre lg:text-2xl sm:flex-row text-sky-500 mr-10">Retrieval Augmented Generation</h1>
          <div className="flex px-4 py-2 rounded ml-auto mr-10">
       <button className=" bg-yellow-400 rounded-full mr-2 p-2"> <Link to="/signup">Sign up</Link> </button>
        <button className=" bg-yellow-400 rounded-full p-2"><Link to="/login">Login</Link></button>
        </div>
      </div>
     
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
     
      
    </div>
   </BrowserRouter>
  
   
   </div>
  
  );
}

export default App;
