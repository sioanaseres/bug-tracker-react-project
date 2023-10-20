import React from 'react'
import { NavLink , Link} from 'react-router-dom'
import "./Sidebar.css"
import { useAuthContext } from '../hooks/useAuthContext'
import {  VscDebugConsole} from "react-icons/vsc"
import {BiTask} from "react-icons/bi"
import {FaChartLine} from "react-icons/fa"
import {AiOutlinePlus} from "react-icons/ai"



const Sidebar = () => {
    const {user} = useAuthContext()
  return (
    <div className='sidebar'>
      <div className="sidebar-content">
          <div className='logo'>
          <Link to="https://stage-poker-staticcontent.safe-iplay.com/tools/qa-tool/index.html" >
            <VscDebugConsole className='logo-icon'></VscDebugConsole>
               
           </Link>

            <span className='title'>Bug Tracker</span>
         </div>
          <div className="user">
            {user &&  <p>Hey {user.displayName}! </p> }
         
          </div>
            <nav className="links">
                 <ul>
                    <li ><NavLink to="/" className='link-item'>
                        <BiTask className='sidebar-icon'></BiTask>
                        <span>Tasks</span>
                        </NavLink>
                    </li>
                    <li ><NavLink to="/create" className='link-item'>
                       <AiOutlinePlus className='sidebar-icon'></AiOutlinePlus>
                        <span>Add Task </span>
                        </NavLink>
                    </li>
                    <li ><NavLink to="/charts" className='link-item'>
                      <FaChartLine className='sidebar-icon'></FaChartLine>
                        <span>Charts</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Sidebar