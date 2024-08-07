import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from "./Componants/About";
import {Navbar}  from './Componants/Navbar';
import Home from './Componants/Home';
import NoteState from './Constaxt/notes/NoteState';
import Login from './Componants/Login';
import SignupUser from './Componants/SignupUser';
import Alert from './Componants/Alert';

function App() {
  const [alert, setalert] = useState("")
  const showalert = (text , type)=>{
    setalert({
      text:text,
      type:type
    })
    setTimeout(()=>{
      setalert("")
    } , 2000)
  }
  

  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route exact path='/' element={<Home showalert={showalert}/>}/>
          <Route exact path='/about' element={<About showalert={showalert}/>} />
          <Route exact path='/login' element={<Login showalert={showalert}/>} />
          <Route exact path='/signup' element={<SignupUser showalert={showalert}/>} />
        </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
