import React, {useState} from 'react'
import "./BugComments.css"
import { useParams } from 'react-router-dom'
import {timestamp} from "../firebase/config"
import {useAuthContext} from "../hooks/useAuthContext"
import { useFirestore } from '../hooks/useFirestore'
import { useDocument } from '../hooks/useDocument'
import {BiTrash} from "react-icons/bi"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const BugComments = ({bug, currentTask}) => {
  const [newComment, setNewComment] = useState("")
  const { response, updateDocument} = useFirestore("tasks")
  const {user} = useAuthContext()
 const {id} = useParams()
  const {document:task, error} =  useDocument("tasks", currentTask.id)

  const handleUpdateComments = async (bugId, newComment) => {
    const updatedBugs = currentTask.bugs.map((bug) => {

      if (bug.id === bugId) {
  
        return {
          ...bug,
          comments:[...bug.comments, newComment]
        };
      }
      return bug;
    });
  
    await updateDocument(currentTask.id, { bugs: updatedBugs });
  };
  const handleSubmit = async (e) =>{
    e.preventDefault()

    const commentToAdd = {
        displayName: user.displayName,
        createdBy: user.uid,
        bugItemId: bug[0].id,
        content: newComment, 
        createdAt: timestamp.fromDate(new Date()),
        id: Math.random()
    }


    handleUpdateComments(bug[0].id, commentToAdd);
    
      if(!response.error){
        setNewComment("")
      }

}

const handleDeleteComment = async (commentId) => {
  const updatedBugs = currentTask.bugs.map((bug) => {
      if (bug.id == id) {
      const updatedComments = bug.comments.filter((c) => c.id !== commentId);
      return {
        ...bug,
        comments: updatedComments,
      };
    }
    return bug;
  });

  await updateDocument(currentTask.id, { bugs: updatedBugs });
};

  return (
    <div className='bug-comments-container'>
      <h2 className='page-title'>Comments</h2>
      <ul className='bug-comments'>
        {bug[0].comments.length === 0 && <p style={{ fontSize:'0.8rem'}}>No comments yet!</p>}
          
        {bug[0].comments.length >0 &&  bug[0].comments.map(c=>(
            <li key={c.id} >
              <p className='comment-header'>
              <span className="comment-author">{c.displayName}, </span>
              <span className='comment-date'>{formatDistanceToNow(c.createdAt.toDate(), {addSuffix:true })}</span>
              </p>
              
              <p className="comment-content">{c.content}</p>
              <button onClick={()=>handleDeleteComment(c.id)} className='comment-delete'>
                
              
               <BiTrash className='trash-icon'></BiTrash>
                </button>
          
          </li>)) }

      </ul>
      <form className="comments-form" onSubmit={handleSubmit}>
        <div>
         <label  >
          <span>Add a new comment:</span>
          <textarea className='bug-comment' 
                required  
                  onChange={(e)=>setNewComment(e.target.value)}
                  value={newComment}
                  placeholder='add a comment...'
                  > </textarea>
          </label>
          <button className='btn' >
              <span class="transition"></span>
              <span class="gradient"></span>
              <span class="label">Add Comment</span>
          </button>
        </div>

     </form>
     
    </div>
  )
}

export default BugComments