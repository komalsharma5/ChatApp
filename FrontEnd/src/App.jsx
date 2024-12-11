import React from 'react'
import Left from './Home/Leftpart/Left'
import Right from './Home/Rightpart/Right'
import SignUp from './Components/SignUp'
import { useAuth } from './Context/AuthProvider'
import Login from './Components/Login'

import { Navigate, Route, Routes } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [authUser ,setAuthUser] = useAuth()
  console.log(authUser);

  return (
  <>
    <Routes>
    <Route path='/' element={
      authUser?   
    //   <div className='flex h-screen'>
    //   <Left></Left>
    //   <Right></Right>
    // </div>
    <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    
    <Right></Right>
    
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
     <Left></Left>
    </ul>
  </div>
</div>
    : <Navigate to="/login" />
    }></Route>
    <Route path='/signup' element={authUser? <Navigate to="/" /> : <SignUp></SignUp>}></Route>
    <Route path='/login' element={authUser? <Navigate to="/" /> : <Login></Login>}></Route>
    
  </Routes>
  <Toaster></Toaster>
  </>
  )
}

export default App
