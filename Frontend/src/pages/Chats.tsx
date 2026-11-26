import { MessageCircle, Search } from "lucide-react"

const Chats = () => {
  return (
    <div className="flex h-full w-[100%]">
        <div className="p-2 w-[20%] flex flex-col bg-white border-r border-r-gray-200">
            <div className="flex items-center gap-2">
                <MessageCircle className="text-indigo-800"/>
                <h1 className="font-extrabold text-xl text-gray-800">Chats</h1>
            </div>
            <div className="flex gap-2 items-center mt-4 border border-gray-400 rounded-md p-2">
                <Search className="h-4 w-4 text-gray-400"/>
                <input type="text" className="outline-none w-full text-gray-500" placeholder="Search conversations"/>
            </div>
        </div>
        <div></div>           
    </div>
  )
}

export default Chats
