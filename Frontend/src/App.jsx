import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import { useContext } from 'react'

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<UserLogin />} />
        <Route path='/Signup' element={<UserSignup />} />
        <Route path='/Captain-Login' element={<CaptainLogin />} />
        <Route path='/Captain-Signup' element={<CaptainSignup />} />
      </Routes>
    </div> 
  )
}

export default App
