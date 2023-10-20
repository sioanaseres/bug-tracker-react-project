import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import "./BugSummary.css"
import { useFirestore } from '../hooks/useFirestore'
import {AiOutlineCheckCircle, AiOutlineCheckSquare} from "react-icons/ai"
import {SiTodoist} from "react-icons/si"
import {BiCommentDetail} from "react-icons/bi"


const BugSummary = ({bug, tasknumber, index, task}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const { response, updateDocument} = useFirestore("tasks")  

  const handleChange = async (event) => {
    const newSelectedValue = event.target.value;
    setSelectedValue(newSelectedValue);
   
    const bugId = event.target.dataset.bugId;
    const updatedBugs = task.bugs.map((bug) => {
      if (bug.id == bugId) {
   
      return {
        ...bug,
        status: newSelectedValue,
      };
    }
    return bug;
  });
    
    await updateDocument(task.id, { bugs: updatedBugs });
    
  // Clear the selected option
  setSelectedValue("");
  };
return (
    <div className={bug.status && (bug.status === "Fixed-verified" || bug.status === "Ignored" )? "fixed-bug bug-summary-item" : "bug-summary-item"}>   
     
      <div className="bug-summary-item-details">
          <p className='bug-id'> {index+1}</p>
          <p className='bug-details' key={index*2000000}>
            {bug.status && (bug.status === "Fixed-verified" || bug.status === "Ignored" )? 
              <AiOutlineCheckCircle className='check-icon'  /> : ( (bug.status === "Fixed" || bug.status === "Ignore") ? <AiOutlineCheckSquare className='modified-icon'/> : <SiTodoist className='todo-icon'/>) }

           <Link to={`/task/${tasknumber}/${bug.id}`} >
              {bug.bugDescription.substring(0,80)}...
           </Link ></p>
          <p className={bug.severity && (bug.severity === "High-priority")? "error bug-severity" : "bug-severity"}>{bug.severity}</p>
          <p className='bug-market'>
              { bug.marketList.map((m, index)=>(<span key={m.marketName} className="market-item">{m.marketName}  {index !== bug.marketList.length - 1 && "|"} </span>))}
            </p>
          <p className='bug-environemt'>{bug.environment}</p>
          <p className='bug-platform'> { bug.platformList.map((m, index)=>(<span key={m.platformName} className="platform-item">{m.platformName} {index !== bug.platformList.length - 1 && "|"} </span>))}</p>
        <div className='bug-status-container'>
        <p  >{bug.status? bug.status : "New"} </p>
            <select className='bug-status-select' value={selectedValue} onChange={handleChange} data-bug-id={bug.id}>
            <option value="">Select option</option>
              <option value="New">New</option>
              <option value="Fixed">Fixed</option>
              <option value="Ignore">Ignore</option>
              <option value="Ignored">Ignored</option>
              <option value="Fixed-verified">Fixed-verified</option>
           </select>
        </div>
         
          {bug.comments.length > 0 ? (<p style={{display:"flex", justifyContent:"center", alignItems:"center"}}><span>{bug.comments.length}</span>
    
          <BiCommentDetail className='comment-icon'> </BiCommentDetail>
          </p>) : (<p>No comments!</p>) }
      
    </div>
   </div>
 
 
  )
}

export default BugSummary