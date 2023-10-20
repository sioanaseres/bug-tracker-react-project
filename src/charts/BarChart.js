import React from 'react'
import {Bar} from "react-chartjs-2"

import "./Charts.css"


const BarChart = ({chartData}) => {
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
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          callback: function (value, index, values) {
            if (Number.isInteger(value)) {
              return value;
            }
            return '';
          },
          color: 'white',
          font: {
            size: 16
        }
         
        },
      },
      x:{
        ticks:{
          color: 'white',
          font: {
            size: 16
        }
         
         
        }
      }
    },
  };

  return (
    <div className='chart'> 
        <Bar data={chartData} options={options}></Bar>
    </div>
   
  )
}

export default BarChart