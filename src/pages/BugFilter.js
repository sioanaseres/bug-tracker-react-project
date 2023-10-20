import React from 'react'

const filterList = ["All", "My-tasks", "Web", "Html", "Content-Editor"]

const BugFilter = ({currentFilter, changeFilter}) => {
    
    const handleClick = (newFilter) =>{
        changeFilter(newFilter)
       
    }
  return (
    <div className='bug-filter'>
    
        <nav>
        <p>Filter by:</p>
            {filterList.map((f)=>(
                <button key={f} className={currentFilter === f ? "active btn" : "btn"} onClick={()=>handleClick(f)} >{f}</button>
            ))}

            
        </nav>
    </div>
  )
}

export default BugFilter