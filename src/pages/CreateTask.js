import React, {useState} from 'react'
import { useNavigate} from "react-router-dom"
import "./CreateTask.css"
import Select from "react-select"
import {useAuthContext} from "../hooks/useAuthContext"
import { useFirestore } from '../hooks/useFirestore'
import {toast} from "react-toastify"

const categories = [
  {value: "Web", label: "Web"},
  {value: "Html", label: "Html"},
  {value: "Content-Editor", label: "Content-Editor"}
]
const Create = () => {
  const [taskNumber, setTaskNumber] = useState("")
  const [taskName, setTaskName] = useState("")
  const [taskCategory, setTaskCategory] = useState([])

  const {user} = useAuthContext()
  const {addDocument, checkTaskNumberExists, response} = useFirestore("tasks")
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
   e.preventDefault()

    if(!taskNumber) {
  
      toast.error("Please insert a task number")
      return
    }
    if(!taskName) {
      toast.error("Please add a task name")
      return
    }
    if(taskCategory.length<1) {
      toast.error("Please select at least 1 task category")
      return
    }
  
    // Check if task number already exists
    const taskNumberExists = await checkTaskNumberExists(taskNumber);
      if (taskNumberExists) {
        toast.error("Task number already exists");
        return;
    }
    const createdBy = {
      displayName: user.displayName,
      id:user.uid
    }

    const taskCategoryList = taskCategory.map((t)=>{
        return {
         category: t.value
        }
    })

  
    const task = {
      taskNumber,
      taskName, 
      bugs: [],
      createdBy,
      taskCategoryList,
     status : "new"
      }


    await addDocument(task)
    if(!response.error) {
      navigate(`/task/${task.taskNumber}`)
    }

   
  }
   return (
     <div className="form">
       <h2 >Create a new bug list</h2>
       <form >
         <label >
           <span>Task number: </span>
           <input type="text" 
           required
           onChange={(e)=>setTaskNumber(e.target.value.trim())}
           value={taskNumber}
           />
         </label>
         <label >
           <span>Task name: </span>
           <input type="text" 
           required
           onChange={(e)=>setTaskName(e.target.value)}
           value={taskName}
           />
         </label>
         <label >
          <span>Task category:</span>
          <Select
          options ={categories}
          onChange={(option)=>setTaskCategory(option)}
          isMulti
          ></Select>
         </label>
        <button className='btn btn-form' onClick={handleSubmit}>
            <span className="transition"></span>
            <span className="gradient"></span>
            <span className="label">Add task</span>

        </button>
    </form>
     </div>
   )

}

export default Create