import React from 'react'
import Signup from './Signup'
import Login from './Login';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';

const TitleBar = () => {
  return (
    <div className="bg-blue-500 p-2 text-center">
        <h1 className="text-white text-4xl font-semibold">Retrieval Augmented Generation</h1>
        
    </div>
  )
}

export default TitleBar