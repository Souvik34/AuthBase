import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/home'

const App = () => {
  return (
    <>
    <div className='text-3xl flex mt-52 font-bold items-center justify-center text-blue-500'>AuthBase</div>
    <Routes>

      <Route path='/' element={<Navigate to= '/login'/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home />} />

    </Routes>
    </>
  )
}

export default App