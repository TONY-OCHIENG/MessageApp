import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { authStore } from '../store/authStore'
import Loader from '../components/Loader'


const Chat = () => {
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
        navigate('/login')
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
      
    </div>
  )
}

export default Chat
