import React, {useState} from 'react'
import {BsSearch} from "react-icons/bs"

const SearchBug = ({handleSearchTerm}) => {

const [searchTerm, setSearchTerm] = useState('')

const handleSearch = (e) =>{
  setSearchTerm(e.target.value)

}


const handleSearchClick = () => {
  handleSearchTerm(searchTerm);
  setSearchTerm("")
};
  return (
    <div className='search-container'>
    <label className="search-label">Search task:</label>
            <input type="text" className="search-input" placeholder="Search task..." value={searchTerm} onChange={handleSearch}/>
              <button onClick={handleSearchClick}>
                    <BsSearch></BsSearch>
               </button>
     
    </div>
  )
}

export default SearchBug