import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const {authUser, token, logout} = useContext(AuthContext)
    const navigate = useNavigate()
  return (
    <div className='w-full h-20 border flex items-center justify-between px-5'>
      <div className='text-xl font-bold'>LOGO</div>
      <div>
        {
         !token?<button className='border px-3 py-2  rounded-full  font-semibold hover:bg-black hover:text-white hover:scale-105 duration-300' onClick={()=>navigate('/login')}>Get Started</button>:
         <div>
         <button className=' border px-3 py-2 bg-black text-white font-semibold rounded-full' onClick={()=>navigate('/create')}>My sessions</button>
         <button className='px-3 py-2 bg-red-500 rounded-full text-white m-2' onClick={()=>logout()}>Logout</button>
         </div>
        }
      </div>
    </div>
  )
}

export default Navbar
