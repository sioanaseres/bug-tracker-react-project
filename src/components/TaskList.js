import React from 'react'
import { Link } from 'react-router-dom'
import "./TaskList.css"
import {useFirestore} from "../hooks/useFirestore"
import {BiTrash} from "react-icons/bi"
// import {BsCodeSlash} from "react-icons/bs"
// import {MdOutlineContentPasteGo} from "react-icons/md"
// import {HiOutlineMailOpen} from "react-icons/hi" 
import {contentSvg, webSvg, htmlSvg} from "./SvgIcons"

const TaskList = ({tasks}) => {
  const {  deleteDocument} = useFirestore("tasks")
 
    const handleClick = async(e, taskId)=>{
      e.preventDefault()
      await deleteDocument(taskId)
      
   }
  return (
    <div className='task-list'>
        {tasks.length === 0 && <p>No tasks yet!</p>}
      
        {tasks.map((task)=>(
          
            <Link to={`/task/${task.taskNumber}`} key={task.id} className='task-card'>
             <div className="task-header">
                 <div className='task-category'>
                   
                   <ul>
                    {task.taskCategoryList.map(c => (
                     <li key={c.category}>
                     
                      {c.category && (c.category === "Web" )? webSvg : (c.category === "Content-Editor" ? contentSvg : htmlSvg  )}
                      
                      <span>{c.category}</span>
                      </li>
                   ))}
                    </ul>
                    <span className={(task.status==='new')? 'status-label-new' : "status-label-done" }>{task.status}</span>
                 </div>
                 </div>
                 <div className="task-content">
                <h4>{task.taskNumber.toUpperCase()}</h4>
                <h4 className='task-name'>{task.taskName.toLowerCase()}</h4>
             
             
              
                 <div className='btn-container'>
                  <button onClick={(e)=>handleClick(e, task.id)} className='trash'>
                  
                    <BiTrash className='trash-icon'></BiTrash>
                    </button>
                 </div>
                 </div>
                
            </Link>
        ))}
    
    </div>
  )
}

export default TaskList