import { Lock, MessageCircle, Search, X } from "lucide-react"
import { useState } from "react"

const Chats = () => {
    const [newChat,setNewChat] = useState<Boolean>(false)
  return (
    <div className="flex h-full w-[100%]">
        <div className=" w-[20%] flex flex-col bg-white border-r border-r-gray-200">
           <div className="shadow-md p-2 rounded-md">
                <div className="flex items-center gap-2">
                    <MessageCircle className="text-indigo-800"/>
                    <h1 className="font-extrabold text-xl text-gray-800">Messages</h1>
                </div>
                <div className="flex gap-2 items-center mt-4 border border-gray-400 rounded-md p-2">
                    <Search className="h-4 w-4 text-gray-400"/>
                    <input type="text" className="outline-none w-full text-gray-500" placeholder="Search conversations"/>
                </div>
                <div className="flex gap-2 text-sm text-gray-600 mt-3">
                    <button className="p-1 rounded-full px-5 bg-indigo-200 cursor-pointer">All</button>
                    <button className="p-1 rounded-full px-5 border border-gray-400 cursor-pointer">Unread</button>
                    <button className="p-1 rounded-full px-5 border border-gray-400 cursor-pointer">Favourites</button>
                </div>
           </div>
        </div>
        <div className="w-full h-full">
         <div className="relative w-full h-full flex justify-center items-center">
            <div className="flex flex-col items-center">
                <img src="/chat-app-icon.png" alt="" className="h-40 w-40"/>
                <h1 className="text-2xl font-extrabold mt-2 text-gray-600">Select a conversation</h1>
                <p className="text-gray-400 text-sm text-center">Choose a chat from the list and start chatting, or begin a <br /> 
                  conversation with someone on your team
                </p>
                <button onClick={() => setNewChat(!newChat)} className="py-3 px-8 text-sm font-extrabold  rounded-md mt-4 text-white 
                cursor-pointer bg-indigo-500">Start a new chat</button>
                <span className="flex gap-2 mt-4 items-center text-xs text-indigo-900 font-extrabold">
                    <Lock className="text-indigo-600 h-4 w-4"/>
                    Your conversations are private
                </span>
            </div>
           <div className="absolute flex flex-col p-4 bg-white shadow-md rounded-md w-[50%] h-[70vh]">
            <X className="absolute right-8 cursor-pointer text-gray-600 h-5 w-5"/>
           </div>
         </div>
        </div>           
    </div>
  )
}

export default Chats
