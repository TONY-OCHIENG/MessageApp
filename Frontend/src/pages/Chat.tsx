import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { authStore } from '../store/authStore'
import Loader from '../components/Loader'
import { Bot, MessageCircle, Users2Icon } from 'lucide-react'


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
    <div className='flex bg-stone-100'>
      <div className='bg-white flex items-center gap-5 flex-col p-4 h-[100vh] w-[6%] border-r border-r-gray-200'>
        <MessageCircle className='text-indigo-600 mt-4 h-10 w-10 bg-indigo-200 p-2 rounded-md'>
          <title>Chats</title>
        </MessageCircle>
        <Users2Icon className='text-indigo-600 h-10 w-10 bg-indigo-200 p-2 rounded-md'>
          <title>Goup chat</title>
        </Users2Icon>
        <Bot className='text-indigo-600 h-10 w-10 bg-indigo-200 p-2 rounded-md'>
          <title>AI chat</title>
        </Bot>
      </div>
      <div></div>      
    </div>
  )
}

export default Chat
