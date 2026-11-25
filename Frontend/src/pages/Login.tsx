import { Eye, EyeOff, Loader } from 'lucide-react'
import { useEffect, useState, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authStore } from '../store/authStore'
import type { LoginDetails } from '../types/types'
import toast from 'react-hot-toast'
const Login = () => {
    const { loader, loginAccount,authenticateUser} = authStore()
    const [showpassword,setshowPassword] = useState<Boolean>(false)
    const [isChecked,setIschecked] = useState<boolean>(false)
     const [checking, setChecking] = useState(true)
    const navigate = useNavigate()
    const [details, setDetails] = useState<LoginDetails>({
        email:"",
        password:"",       
    })  
     const [userId, setUserId] = useState<String | null>(null)
    
      useEffect(() => {
        let cancelled = false
    
        const handleAuthentication = async () => {
          const { success, user_id } = await authenticateUser()
          if (cancelled) return
    
          if (success) {
            setUserId(user_id)
            navigate("/")
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

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setDetails((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    //A function that submits new user details to the database

    const handleSubmit = async (event: ChangeEvent): Promise<void> => {
        event.preventDefault()
        const { success, message} = await loginAccount(details)
        if (success) {
          toast.success(message)
          setDetails({
            email:"",
            password:""
          })
          navigate("/")
        }
    } 
  return (
    <div className="flex w-full h-[100vh] bg-stone-50 font-serif overflow-hidden">
        <div className="bg-stone-100 h-full w-full lg:w-[50%] p-4
        flex justify-center items-center">
            <form onSubmit={handleSubmit} action="" className="lg:w-[60%] w-full">
                <div className="w-full flex flex-col mb-4">
                    <h1 className="font-extrabold text-gray-800 text-2xl">Welcome back</h1>
                    <p className="text-sm text-gray-500">Log in to pic up your conversations</p>
                </div>                  
                 <label htmlFor="email" className="text-gray-900">Email</label>
                <input type="email" required name='email' value={String(details.email)} onChange={handleValueChange} placeholder='your@gmail.com' className="w-full border-gray-400 border rounded-md p-2 focus:outline-indigo-800
                mb-2 text-gray-500 "/> 
                <div className="w-full flex justify-between items-center">
                    <label htmlFor="password" className="text-gray-900 w-full justify-between">Password</label>
                    <div onClick={() => setshowPassword(!showpassword)}>
                        {
                            showpassword ? <EyeOff className='h-4 w-4 cursor-pointer mr-2'/> :
                            <Eye className='h-4 w-4 cursor-pointer mr-2'/>
                        }
                    </div>        
                </div>      
                <input type={showpassword ? "text" : "password"} required name='password' value={String(details.password)} onChange={handleValueChange} placeholder="At least 8 characters" className="w-full border-gray-400 border rounded-md p-2 focus:outline-indigo-800
                mb-2 text-gray-500 "/>  
                <div className='flex items-center justify-between'>
                    <div className='flex gap-2'>
                      <input type="checkbox"   checked={isChecked}  onChange={(e) => setIschecked(e.target.checked)} className='outline-none text-indigo-600' />
                      <p className='text-sm text-gray-500' >Keep me logged in</p>
                    </div>
                    <Link to={""} className='font-extrabold text-sm text-indigo-950'>Forgot Password?</Link>
                </div>   
                <button className='w-full disabled:opacity-50 py-2 bg-indigo-700 text-white cursor-pointer
                font-extrabold mt-4 rounded-md flex justify-center items-center'>{
                    loader ? <Loader className='animate-spin '/> : "Login"
                }</button>  
                <p className='text-center mt-4 text-gray-600 text-xs'>New here? <Link className='text-indigo-600 underline' to={"/register"}>Create an account</Link></p>  
            </form>
        </div>
        <div className='w-[50%] flex flex-col hidden lg:block'>
            <img src="/login-illustration.png" alt="" className='h-[80vh] w-full object-cover'/>
            <div className='w-full bg-indigo-900 h-full p-10'>
                <h1 className='text-2xl text-white font-extrabold'>Your chats right where you left them.</h1>
                <p className='text-sm text-white w-[65%]'>Your full message history is saved, so you can continue any conversation on any device</p>
            </div>
        </div>
    </div>
  )
}

export default Login
