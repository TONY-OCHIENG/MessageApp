import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom"
import Loader from './components/Loader'
import { authStore } from './store/authStore'

// Each page is loaded only when the user navigates to it
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Chat = lazy(() => import('./pages/Chat'))

const App = () => {
  const navigate = useNavigate()
  const { authenticateUser } = authStore()
  const [checking, setChecking] = useState(true)
  const [userId, setUserId] = useState<String | null>(null)

  useEffect(() => {
    let cancelled = false

    const handleAuthentication = async () => {
      const { success, user_id } = await authenticateUser()
      if (cancelled) return

      if (success) {
        setUserId(user_id)
      } else {
        navigate('/login', { replace: true })
      }
      setChecking(false)
    }

    handleAuthentication()
    return () => {
      cancelled = true
    }
  }, [authenticateUser, navigate])

  if (checking) return <Loader/>
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
