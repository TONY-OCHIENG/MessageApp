import { Eye, EyeOff, Loader } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import type { RegistrationDetails } from '../types/types'
import { authStore } from '../store/authStore'
import toast from 'react-hot-toast'
const Register = () => {
    const { registerAccount,loader } = authStore()
    const [showpassword,setshowPassword] = useState<Boolean>(false)
    const [isChecked,setIschecked] = useState<boolean>(false)
    const [details, setDetails] = useState<RegistrationDetails>({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })  

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
        const { success, message} = await registerAccount(details)
        if (success) {
            toast.success(message)
        }
    } 
  return (
    <div className="flex w-full h-[100vh] bg-stone-50 font-serif overflow-hidden">
        <div className="bg-stone-100 h-full lg:w-[50%] p-4
        flex justify-center items-center">
            <form onSubmit={handleSubmit} action="" className="max-w-md">
                <div className="w-full flex flex-col mb-4">
                    <h1 className="font-extrabold text-gray-800 text-2xl">Create your account</h1>
                    <p className="text-sm text-gray-500">Start chatting in less than a minute</p>
                </div>
                <label htmlFor="firstName" className="text-gray-900">First name</label>
                <input type="text" required name='firstName' value={String(details.firstName)} onChange={handleValueChange} placeholder='your first name' className="w-full border-gray-400 border rounded-md p-2 focus:outline-indigo-800
                mb-2 text-gray-500 "/>     
                 <label htmlFor="lastName"  className="text-gray-900">Last name</label>
                <input type="text" required name='lastName' value={String(details.lastName)} onChange={handleValueChange} placeholder='your last name' className="w-full border-gray-400 border rounded-md p-2 focus:outline-indigo-800
                mb-2 text-gray-500 "/>      
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
                 <label htmlFor="confirmPassword" className="text-gray-900">Confirm password</label>
                <input type={showpassword ? "text" : "password"} required name='confirmPassword' value={String(details.confirmPassword)} onChange={handleValueChange} placeholder="Repeat your password" className="w-full border-gray-400 border rounded-md p-2 focus:outline-indigo-800
                mb-2 text-gray-500 "/>   
                <div className='flex gap-2'>
                    <input type="checkbox"   checked={isChecked}  onChange={(e) => setIschecked(e.target.checked)} className='outline-none text-indigo-600' />
                    <p className='text-sm text-gray-500' >I agree to the <span className='text-indigo-600 underline cursor-pointer'>Terms of service</span> and <span className='text-indigo-600 underline cursor-pointer'>Privacy Policy</span></p>
                </div>   
                <button disabled={!isChecked} className='w-full disabled:opacity-50 py-2 bg-indigo-700 text-white cursor-pointer
                font-extrabold mt-4 rounded-md flex justify-center items-center'>{
                    loader ? <Loader className='animate-spin '/> : "Create account"
                }</button>  
                <p className='text-center mt-4 text-gray-600 text-xs'>Already have an Account? <Link className='text-indigo-600' to={"/login"}>Login</Link></p>  
            </form>
        </div>
        <div className='w-[50%] flex flex-col hidden lg:block'>
            <img src="/register-illustration.png" alt="" className='h-[80vh] w-full object-cover'/>
            <div className='w-full bg-indigo-900 h-full p-10'>
                <h1 className='text-2xl text-white font-extrabold'>Conversations that keep up with you.</h1>
                <p className='text-sm text-white w-[65%]'>One-on-one chats group conversations and a full message history all on one place</p>
            </div>
        </div>
    </div>
  )
}

export default Register
