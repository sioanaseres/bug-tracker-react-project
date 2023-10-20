import React , {useState} from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { Link , useNavigate} from 'react-router-dom'
import BugComments from '../components/BugComments'
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import {BiTrash} from "react-icons/bi"
import {TbArrowBackUp} from "react-icons/tb"

const statuses =[
    {value: "New", label: "New"},
    {value: "Fixed", label: "Fixed"},
    {value: "Ignored", label: "Ignored"},
    {value: "Fixed-verified", label: "Fixed-verified"},
  ]
const Bug = ({bug, currentTask}) => {
    
  const [newStatus, setNewStatus] = useState('')
  const { response, updateDocument} = useFirestore("tasks")  
  const navigate = useNavigate()
  
   const handleDeleteBug = async(bugId)=>{
      
      const updatedBugs = currentTask.bugs.filter((bug) => bug.id != bugId);
  
      const updates = {
        bugs: updatedBugs,
      };

      
    await updateDocument(currentTask.id, updates);
  
     navigate(`/task/${bug[0].tasknumber}`)
    }
   
    if (!bug) {
      // Bug data not fetched yet
      return <div className="loading">Loading...</div>;
    }


  return (
   
    <React.Fragment key={bug[0].id}>
    {bug &&  (<div className="bug-item-summary" >
          <div className='bug-item-author'>
            <p className="bug-item-summary-created">Created by: <span style={{textTransform:"capitalize"}}>{bug[0].createdBy.displayName}</span></p>
            <p className="bug-item-summary-created">Created at: {formatDistanceToNow(bug[0].createdAt.toDate(), {addSuffix:true })}</p>
          </div>
    
          <h2 >Description</h2>
          <p className="bug-item-summary-description" >{bug[0].bugDescription}</p>
          <p className="bug-item-summary-market "><span className='bold'>Market:</span> <span className='blue'>{bug[0].marketList.map((m, index)=><span key={m.marketName} style={{marginRight: "10px"}}>{m.marketName}  {index !== bug[0].marketList.length - 1 && "|"}</span>)}</span> </p>
          <p ><span className='bold'>Platform:</span> {bug[0].platformList.map((b, index)=><span key={b.platformName} style={{marginRight: "10px"}}>{b.platformName} {index !== bug[0].platformList.length - 1 && "|"}</span>)}</p>
          <p ><span className='bold'>Environment: </span>{bug[0].environment}</p>
        
            <p ><span className='bold'>Status: </span>{bug[0].status}</p>
          <Link to={`/task/${bug[0].tasknumber}`} > 
             <TbArrowBackUp className='back-icon'></TbArrowBackUp> Back to Bugs List</Link>
          <div className='buttons-container'>
            <button onClick={()=>handleDeleteBug(bug[0].id)} >
               <BiTrash className='trash-icon'></BiTrash>
              </button>
        
          </div>
         
        </div>)}
        
      { bug  &&  <BugComments  bug={bug} currentTask={currentTask} />  }
      </React.Fragment>
  )
}

export default Bug