import React from 'react'
import "./OnlineUsers.css"
import {useCollection} from "../hooks/useCollection"

const OnlineUsers = () => {
  const {error, documents } = useCollection("users")

  return (
    <div className='user-list'>
        <h2>Users</h2>
     
        {error && <div className='error'> </div>}
        {documents && documents.map((user)=>(
               <div key={user.id} className="user-list-item">
                {user.online &&  <span className="online-user"></span>}
               
                <span className='online-user-name'>{user.displayName.toLowerCase()}</span>
               </div>
        ))}
    </div>
  )
}

export default OnlineUsers