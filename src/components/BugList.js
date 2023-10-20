import React , {useEffect} from 'react'
import "./BugList.css"
import { useAuthContext } from '../hooks/useAuthContext'
import { useDocument } from '../hooks/useDocument'
import { useFirestore } from '../hooks/useFirestore'
import BugSummary from './BugSummary'
import {TbArrowBackUp} from "react-icons/tb"
import { Link } from 'react-router-dom'
import {toast} from "react-toastify"

const BugList =  ({currentTaskId}) => {
const {user} = useAuthContext()
const {document:task, error} = useDocument("tasks", currentTaskId)
const {  updateDocument} = useFirestore("tasks")  



  const updateTaskStatus = async () => {
    
    const bugStatusArray = task.bugs.map(bug=>bug.status)
    const allStatusEqual = bugStatusArray.every(status=> status === "Fixed-verified" || status === 'Ignored'  )

    if(allStatusEqual){
      await updateDocument(task.id, { status: "done" });
      toast.success("Task is done")
    } else{
      await updateDocument(task.id, { status: "new" });
      toast.error("Not all bugs are Fixed-verified or Ignored")
    }

   
   
  };




if (error) {
  return <div className='error'>{error}</div>;
}

if (!task) {
  return <div className='loading'>Loading...</div>;
}
  


return (
  <>
  <div className="btn-container-bug-list">
  <Link to={`/`} className='back-to-tasklist'>  <TbArrowBackUp className='back-icon'></TbArrowBackUp> Back to Task List</Link>
  <button className='btn btn-bug-list' onClick={()=>updateTaskStatus()} >
              <span className="transition"></span>
              <span className="gradient"></span>
              <span className="label">Change Task Status: {task.status.toUpperCase()}</span>
   </button>
  
  </div>
 
    <div className="bug-list-container">
      <div className="bug-list-titles">
       <p className='bug-list-title-id'>Id</p>
        <p>Description</p>
        <p>Priority</p>
        <p>Markets</p>
        <p>Environment</p>
        <p>Platform</p>
        <p>Status</p>
        <p>Comments</p>
      </div>
    

       {task.bugs.length === 0 && <p className='no-bugs' style={{textAlign:"left", gridColumn:"span 2", fontSize:'1.2rem'}}>No bugs added yet!</p>}
       
       {task.bugs.length !==0 && (
        <>
       
            {task.bugs.map((bug, index)=> (
          
                <React.Fragment key={bug.id}>
                  {<BugSummary bug={bug} tasknumber={bug.tasknumber} index={index} task={task}/>}
                    
                </React.Fragment>
              ) )}

       </> 
       )} 
      
    </div>
    </>
  )
}

export default BugList