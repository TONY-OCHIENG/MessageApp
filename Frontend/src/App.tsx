import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom"
import Loader from './components/Loader'
import { authStore } from './store/authStore'

// Each page is loaded only when the user navigates to it
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Chat = lazy(() => import('./pages/Chat'))

const App = () => {
  const [user_id,setUser_id] = useState<String>("")
  const navigate = useNavigate()
  const { authenticateUser } = authStore()
  useEffect(() => {
    handleAuthentication()
  },[user_id])
  const handleAuthentication = async () => {
    const { success, user_id} = await authenticateUser()
    if (success) {
      setUser_id(user_id)
      navigate("/")
    } else {
      navigate('/login')      
    }
  }
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
