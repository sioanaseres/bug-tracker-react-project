import React from 'react'
import {Pie} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"
import "./Charts.css"


const PieChart = ({chartData}) => {
  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white' ,
          font: {
            size: 16
        }
        }
      }
    }
  };

  return (
    <div className='pie-chart'> 
        <Pie data={chartData} options={options}></Pie>
    </div>
   
  )
}

export default PieChart