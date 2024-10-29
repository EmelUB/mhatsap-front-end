import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'

const Routers = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default Routers
