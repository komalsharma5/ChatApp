import React from 'react'
import Search from './Search'
import Users from './Users'
import Logout from './Logout'

const Left = () => {
  return (
    <div className='w-full bg-black text-gray-300'>
      <Search></Search>
      <div style={{minHeight:"calc(84vh - 10vh)"}}>
         <Users></Users>
      </div>
      <Logout></Logout>
    </div>
  )
}

export default Left
