import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom"
import Loader from './components/Loader'
import { authStore } from './store/authStore'

// Each page is loaded only when the user navigates to it
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Chat = lazy(() => import('./pages/Chat'))

const App = () => {
  return (
    <div>
      <Suspense fallback={<Loader/>}>
      <Routes>
       <Route path="/Register" element={<Register/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/" element={<Chat/>}/>  
      </Routes>      
      </Suspense> 
    </div>
  )
}

export default App
