import React, {useState} from 'react'
import { useSignup } from '../hooks/useSignup'
import "./Signup.css"

const Signup = () => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [displayName, setDisplayName] = useState('')

const {signup, error, isPending} = useSignup()

const handleSubmit = (e) =>{
  e.preventDefault()
  signup(email, password, displayName)
}

  return (
    
   <form className='form' onSubmit={handleSubmit}>
    <h2>Sign up</h2>
      <label >
        <span>Email:</span>
        <input type="email" 
        required
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        />
      </label>
      <label >
        <span>Password:</span>
        <input type="password" 
         required
         onChange={(e)=>setPassword(e.target.value)}
         value={password}/>
      </label>
      <label >
        <span>Name:</span>
        <input type="text" 
         required
         onChange={(e)=>setDisplayName(e.target.value)}
         value={displayName}/>
      </label>
    
      {!isPending &&  <button className='btn btn-form'>Sign up</button>}
      {isPending &&  <button className='btn btn-form' disabled>Loading</button>}
      {/* {error && <p className='error'>{error}</p>} */}
   </form>
  )
}

export default Signup