import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Chat from "./pages/Chat"

const App = () => {
  return (
    <div>
      <Routes>
       <Route path="/Register" element={<Register/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/" element={<Chat/>}/>  
      </Routes>       
    </div>
  )
}

export default App
