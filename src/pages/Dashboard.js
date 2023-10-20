import React, {useState} from 'react'
import "./Dashboard.css"
import TaskList from '../components/TaskList'
import BugFilter from './BugFilter'
import SearchBug from '../components/SearchBug'
import {useCollection} from "../hooks/useCollection"
import {useAuthContext} from "../hooks/useAuthContext"

const Dashboard = () => {

  const [currentFilter, setCurrentFilter] = useState("all")
  const {documents, error} = useCollection("tasks", ["createdAt", "desc"])
  const [searchTerm, setSearchTerm] = useState('');
  const {user} = useAuthContext()

  const changeFilter = (newFilter) =>{
    setCurrentFilter(newFilter)
  }

  const handleSearchTerm = (searchTerm) => {
      setSearchTerm(searchTerm);
  };

  const handleReset = () => {
    setSearchTerm('');
    setCurrentFilter("all")
  };
  const filteredTasks = documents ? documents.filter((document) => {

      switch (currentFilter) {
          case "All" : 
            return true
          case "My-tasks" : 
            let createdByMe = false
                        
                  if(user.uid === document.createdBy.id){
                    createdByMe = true
                  }
                   return createdByMe
            case "Web":
            case "Content-Editor":
            case "Html":

                 let categoryListCheck = false
                  document.taskCategoryList.forEach((d)=> {
                 if(d.category === currentFilter){
                  categoryListCheck = true
                 }
               })

                return categoryListCheck

            default: 
             return true
      }
  }) 
 : []

 const searchedTasks = filteredTasks.filter((task) => {
  if (searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toUpperCase();
     return task.taskNumber.includes(lowerCaseSearchTerm);
  }
  return true;
});

  return (
    <div className='dashboard'>
      <h2> Dashboard</h2>
      {error && <p className='error'>{error}</p> }
      <div className="filter-search">
      {documents && <BugFilter currentFilter={currentFilter} changeFilter= {changeFilter} />}
      <div className='search-wrapper'>
      <SearchBug handleSearchTerm={handleSearchTerm}></SearchBug>
       <button className='btn' onClick={handleReset}>
        <span className="transition"></span>
         <span className="gradient"></span>
          <span className="label">Reset</span>
        </button>
      </div>
     

      
      </div>
    
      {filteredTasks && <TaskList tasks = {searchedTasks}></TaskList>}
    </div>
  )
}

export default Dashboard