import { Eye } from 'lucide-react'
const Register = () => {
  return (
    <div className="flex w-full h-[100vh] bg-stone-50 font-serif">
        <div className="bg-stone-100 h-full lg:w-[50%] w-full
        flex justify-center items-center">
            <form action="" className="max-w-md">
                <div className="w-full flex flex-col mb-4">
                    <h1 className="font-extrabold text-gray-800 text-2xl">Create your account</h1>
                    <p className="text-sm text-gray-500">Start chatting in less than a minute</p>
                </div>
                <label htmlFor="" className="text-gray-900">First name</label>
                <input type="text" className="w-full border-gray-400 border rounded-md p-2 focus:outline-purple-800
                mb-2 text-gray-500 "/>     
                 <label htmlFor="" className="text-gray-900">Last name</label>
                <input type="text" className="w-full border-gray-400 border rounded-md p-2 focus:outline-purple-800
                mb-2 text-gray-500 "/>      
                 <label htmlFor="" className="text-gray-900">Email</label>
                <input type="text" className="w-full border-gray-400 border rounded-md p-2 focus:outline-purple-800
                mb-2 text-gray-500 "/> 
                <div className="w-full flex justify-between items-center">
                    <label htmlFor="" className="text-gray-900 w-full justify-between">Password</label>
                    <Eye className='h-4 w-4 cursor-pointer mr-2'/>
                </div>      
                <input type="password" placeholder="At least 8 characters" className="w-full border-gray-400 border rounded-md p-2 focus:outline-purple-800
                mb-2 text-gray-500 "/> 
                 <label htmlFor="" className="text-gray-900">Confirm password</label>
                <input type="password" placeholder="Repeat your password" className="w-full border-gray-400 border rounded-md p-2 focus:outline-purple-800
                mb-2 text-gray-500 "/>          
            </form>
        </div>
        <div></div>
    </div>
  )
}

export default Register
