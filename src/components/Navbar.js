import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

import {useLogout} from "../hooks/useLogout"
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {

  const {user} = useAuthContext()

  const {logout, isPending} = useLogout()

  return (
    <nav className='navbar'>
     <ul>
      

        {!user && (
        <>
        <li>
          <Link to ="login">Login</Link>
        </li>
        <li>
          <Link to="signup">Signup</Link>
        </li>
        </>
        )}
          {user &&   (
          <li>
            {!isPending && <button className='btn' onClick={logout}>
              <span className="transition"></span>
              <span className="gradient"></span>
              <span className="label">Logout</span>
              </button>} 
            {isPending && <button className='btn' disabled>
              <span className="transition"></span>
              <span className="gradient"></span>
              <span className="label">Logging out...</span>
                </button>} 
            
            </li>
          )
          }
     
     </ul>
    </nav>
  )
}

export default Navbar