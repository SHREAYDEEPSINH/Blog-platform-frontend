import React from 'react'
import { Route, Routes } from 'react-router'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AdminPanel from './components/AdminPanel'
import Navbar from './components/Navbar'
import Slider from './components/Slider'



function App() {

  
  return (
      <Routes>
        <Route path='/' element={<><Navbar/><Slider/><Dashboard/></>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<><Navbar/><AdminPanel/></>}/>
      </Routes>
  )
}

export default App