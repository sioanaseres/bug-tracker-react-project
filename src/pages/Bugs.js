import React , {useState, useRef} from 'react'
import { useParams , Link} from 'react-router-dom'
import Select from "react-select"
import {toast} from "react-toastify"
import {timestamp} from "../firebase/config"
import "./Bugs.css"

import { useAuthContext } from '../hooks/useAuthContext'
import { useFirestore , response} from '../hooks/useFirestore'
import {useCollection} from "../hooks/useCollection"
import BugList from '../components/BugList'

const markets = [
  {value: "COM-All", label: "COM-All"},
  {value: "COM-EN", label: "COM-EN"},
  {value: "COM-ES", label: "COM-ES"},
  {value: "COM-BR", label: "COM-BR"},
  {value: "COM-UA", label: "COM-UA"},
  {value: "COM-RU", label: "COM-RU"},
  {value: "DE", label: "DE"},
  {value: "DK", label: "DK"},
  {value: "ES", label: "ES"},
  {value: "RO", label: "RO"},
  {value: "NL", label: "NL"},
  {value: "PT", label: "PT"},
  {value: "DE", label: "DE"},
  {value: "IT", label: "IT"},
  {value: "CA", label: "CA"},
  {value: "SE", label: "SE"},
]
const environments = [
  {value: "Stage", label: "Stage"},
  {value: "Production", label: "Production"},
  {value: "WebClient", label: "WebClient"}
]

const platforms = [
  {value: "All-PC-and-Mobile", label: "All-PC-and-Mobile"},
    {value: "PC", label: "PC"},
    {value: "Mobile-Iphone", label: "Mobile-Iphone"},
    {value: "Mobile-Android", label: "Mobile- Android"},
]



const severityOptions =[
  {value: "High-priority", label: "High-priority"},
  {value: "Medium-priority", label: "Medium-priority"},
  {value: "Low-priority", label: "Low-priority"},
]
const Bugs = () => {
  const [bugDescription, setBugDescription] = useState("")
  const [severity, setSeverity] = useState(null)
  const [market, setMarket] = useState([])
  const [environment, setEnvironment] = useState(null)
  const [platform, setPlatform] = useState([])
 
  const {user} = useAuthContext()
  const {  updateDocument} = useFirestore("tasks")

  const selectedSeverityRef = useRef()
  const selectedMarketRef = useRef()
  const selectedEnvironmentRef =useRef()
  const selectedPlatformRef = useRef()

  const onClear = () =>{
   
    selectedSeverityRef.current.clearValue()
    selectedMarketRef.current.clearValue()
    selectedEnvironmentRef .current.clearValue()
    selectedPlatformRef.current.clearValue()
  }


  const {documents: tasks, error} = useCollection("tasks")
  let { tasknumber } = useParams();

 let tasksNumbers, currentTask, currentTaskId
 if(tasks){
  tasksNumbers = tasks.length > 0 && tasks.map((task)=>task.taskNumber)
  currentTask = tasks.length > 0 && tasks.filter((task)=>  
    task.taskNumber === tasknumber
  )

  currentTaskId = currentTask && currentTask[0].id

 }


  const handleSubmit = async (e) =>{
    e.preventDefault()
      
    if(!severity){
      toast.error("Please select a severity level: high, medium or low")
      return
    }
    if(market.length< 1 ){
    toast.error("Please select a market")
      
      return
    }
   
    if(!environment){
      toast.error("Please select the environment")
      return
    }
    if(platform.length< 1){
      toast.error("Please select the plaform: PC or mobile")
      return
    }

    const createdBy = {
      displayName: user.displayName,
      id:user.uid
    }
  
 
    
   const marketList = market.map(m =>{
      return {
        marketName: m.value
      }
    })

    const platformList = platform.map(p =>{
      return {
       platformName: p.value
      }
    })

   
    const bug = {
      bugDescription,
      environment: environment.value, 
      severity: severity.value,
      comments: [],
      status: "New",
      createdBy,
      marketList,
      platformList,
      tasknumber,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.ceil(Math.random()*1000000)
    }
  
   
 
    // await addDocument(bug)
    await updateDocument(currentTaskId, {
      bugs:[...currentTask[0].bugs, bug]
    })
  
      setBugDescription("")
   
    }


  return (
    <div className='bugs-list'>
     
        <form className=' bug-form' onSubmit={handleSubmit} >
        <h4>Add a bug</h4>
        <label >
            <span>Bug description:</span>
            <textarea
            required
            autoFocus={true}
            onChange={(e)=>setBugDescription(e.target.value)}
            value={bugDescription}
            />
          </label>
        <div className='bug-options'>
        <label >
          <span>Severity: </span>
        <Select
              options ={severityOptions}
              onChange={(option)=>setSeverity(option)}
              isClearable
            ref={selectedSeverityRef}
          ></Select>
        </label>
          <label >
          <span>Select market:</span>
          <Select
              options ={markets}
              onChange={(option)=>setMarket(option )}
              isMulti
              ref={selectedMarketRef}
              ></Select>
          </label>
        <label >
          <span>Select environment: </span>
        <Select
              options ={environments}
              onChange={(option)=>setEnvironment(option)}
              isClearable
              ref={selectedEnvironmentRef}
              ></Select>
        </label>
        <label >
          <span>Select platform: </span>
        <Select
              options ={platforms}
              onChange={(option)=>setPlatform(option )}
              isMulti
              ref ={selectedPlatformRef}
              ></Select>
        </label>
        
      
        </div>
          <button className='btn btn-form' onClick={()=>setTimeout((onClear ),500)} >
              <span className="transition"></span>
              <span className="gradient"></span>
              <span className="label">Add Bug</span>
          </button>
      
        
      </form>

    <div className="bug-list">
      <div>
          <h2 className='page-title'>Bugs List for task : <Link to={`https://jira-prd/browse/${tasknumber.toUpperCase()}`} target='_blank'>{tasknumber.toUpperCase()}</Link> (Jira link) 
          
        </h2>
   
      </div>
      {error && <p className='error'>{error}</p>}
      {currentTaskId && <BugList currentTaskId={currentTaskId} tasksNumbers={tasksNumbers}/>}
    </div>

   
   </div>
  )
}

export default Bugs