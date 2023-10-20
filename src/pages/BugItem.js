import React  , { useState} from 'react'
import { useParams } from 'react-router-dom'
import { useCollection } from '../hooks/useCollection'

import Bug from '../components/Bug'
import "./BugItem.css"


const BugItem =  ({bug}) => {
  const {id} = useParams()

  const {error, documents} = useCollection("tasks")
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTask, setCurrentTask] = useState(null);

  let tasks = null
  if (documents) {
    tasks= documents;
  } else if (error) {
    return <div className='error'>{error}</div>
  } else {
    return <div className='loading'>Loading...</div>
  }

  const findParentTask = async ( bugId) => {
   if (error) {
      console.log('Error fetching tasks:', error);
      throw error;
    }
    
  
    for (const task of tasks) {
      const foundBug = task ? task.bugs.find((bug) => bug.id == Number(bugId)) : null;
    
     if (foundBug) {
        return task;
      }
    }    
    return null; 
  };
  const fetchData = async () => {
    try {
      const currentTask = await findParentTask(id);
   
      if (currentTask) {
        setCurrentTask(currentTask)
        setBugs(currentTask.bugs);
      } else {
        console.log('Parent task not found');
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();


const currentBug = bugs && bugs.filter(bug => bug.id == Number(id))
  if(error) {
     return <div className='error'>{error}</div>
  }
  if(loading  ) {
    return <div className='loading'>Loading...</div>
  }
  return (
  
     
      <div className='bug-item-details'  >
        { tasks && <Bug bug={currentBug} currentTask={currentTask} key={id}></Bug>}
       
      </div>
 
  )
}

export default BugItem