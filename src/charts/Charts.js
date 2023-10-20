import React , {useState, useEffect} from 'react'
import {useCollection} from "../hooks/useCollection"

import BarChart from './BarChart'
import PieChart from './PieChart'


const Charts = () => {
  const { documents:tasks} = useCollection("tasks")
  const [taskDataTotal, setTaskDataTotal] = useState(null);
  const [bugsDataTotal, setBugsDataTotal] = useState(null);
  const [bugsStatus, setBugsStatus]= useState(null);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
  const backgroundColors = ["#05445E", "#189AB4", "#E98973", "#FFA384", "#74BDCB", "#ECF87F", "#E7D4C0", "#74BDCB" ,  "#2E8BC0", "#B1D4E0","#EFE7BC", "#145DA0", "#0C2D48",  "#D9E4EC",  "#6AABD2" , "#385E72", "#B7CFDC","#75E6DA", "#D4F1F4"]
  const currentYear = new Date().getFullYear()


  useEffect(() => {
    if (tasks) {
      const tasksDataF = tasks.reduce((acc, task) => {
        const createdAt = task.createdAt;
        const date = new Date(createdAt.seconds * 1000); 
        const year = date.getFullYear();
        const month = date.getMonth() +1 ; 
        const id = `${year}-${month.toString().padStart(2, '0')}`; 
  
        if (acc.has(id)) {
          acc.get(id).numberOfTasks += 1;
        } else {
          acc.set(id, { id, year, month, numberOfTasks: 1 });
        }
  
        return acc;
      }, new Map());
  
      const tasksDataArray = Array.from(tasksDataF.values());
   
      setTaskDataTotal({
        labels: tasksDataArray.map(t => months[t.month-1]),
        datasets: [
          {
            label: `Number of Tasks in ${currentYear}`,
            data: tasksDataArray.map(t => t.numberOfTasks),
            fontColor: "white",
            backgroundColor:  backgroundColors.slice().sort((a, b) => 0.5 - Math.random())
          }
        ]
      });

      const allBugs = tasks.flatMap((task) => task.bugs);
     
      // total bugs 
      const bugsDataF = allBugs.reduce((acc, bug) => {
        const createdAt = bug.createdAt;
        const date = new Date(createdAt.seconds * 1000); 
        const year = date.getFullYear();
        const month = date.getMonth() +1; 
        const id = `${year}-${month.toString().padStart(2, '0')}`; 
  
   
        if (acc.has(id)) {
          acc.get(id).numberOfBugs += 1;
        } else {
          acc.set(id, { id, year, month, numberOfBugs: 1 , status:bug.status});
        }
  
        return acc;
      }, new Map());
     
      const bugsDataArray = Array.from(bugsDataF.values());
   

      setBugsDataTotal({
        labels: bugsDataArray.map(t => months[t.month-1]),
        datasets: [
          {
            label: `Number of Bugs in ${currentYear}`,
            data: bugsDataArray.map(t => t.numberOfBugs),
            backgroundColor: backgroundColors.slice().sort((a, b) => 0.5 - Math.random())
          }
        ]
      });

 // bugs status 
      const bugStatusCounts = allBugs.reduce((countObj, bug) => {
        const { status } = bug;
        if (countObj.hasOwnProperty(status)) {
          countObj[status]++;
        } else {
          countObj[status] = 1;
        }
        return countObj;
      }, {});
      
  
      const statuses = [];
      const counts = [];
      
      Object.entries(bugStatusCounts).forEach(([status, count]) => {
        statuses.push(status);
        counts.push(count);
      });
     setBugsStatus({
        labels:   statuses,
        datasets: [
          {
            label: `Bug status`,
            data: counts,
            backgroundColor:  backgroundColors.slice().sort((a, b) => 0.5 - Math.random())
          }
        ]
      });

  
    
    }
  }, [tasks, currentYear]);

 
    
   return (
    <div className='charts-container'>
         {tasks ? (
          taskDataTotal ? ( <BarChart chartData={taskDataTotal} /> ) : (<p>No tasks available.</p>  ) ) : (
          <p>Loading...</p>
          )}
      
         {tasks ? (
          bugsDataTotal ? ( <BarChart chartData={bugsDataTotal} /> ) : (<p>No bugs available.</p>  ) ) : (
          <p>Loading...</p>
          )}
      {tasks ? (
          bugsStatus ? ( <PieChart chartData={bugsStatus} /> ) : (<p>No bugs available.</p>  ) ) : (
          <p>Loading...</p>
          )}
    </div>
    
  )
}

export default Charts