import { lazy, Suspense } from 'react'
import { Route, Routes } from "react-router-dom"
import Loader from './components/Loader'
import Chats from './pages/Chats'

// Each page is loaded only when the user navigates to it
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Chat = lazy(() => import('./pages/Chat'))

const App = () => {
  return (
    <div className='font-serif'>
      <Suspense fallback={<Loader/>}>
      <Routes>
       <Route path="/Register" element={<Register/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/" element={<Chat/>}>
         <Route path='/' element={<Chats/>}/>
       </Route>  
      </Routes>      
      </Suspense> 
    </div>
  )
}

export default App
