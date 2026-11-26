import { MessageCircle, Search } from "lucide-react"

const Chats = () => {
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
        <div></div>           
    </div>
  )
}

export default Chats
