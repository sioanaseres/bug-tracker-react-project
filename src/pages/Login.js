import React , {useState} from 'react'
import {useLogin} from "../hooks/useLogin"
import "./Login.css"


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {login, error, isPending} = useLogin()

  const handleSubmit = (e) =>{
    e.preventDefault()
    login(email, password)
  
  }
  return (
    <form className='form' onSubmit={handleSubmit}>
    <h2>Login</h2>
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
      {!isPending &&  <button className='btn btn-form'>
          <span className="transition"></span>
          <span className="gradient"></span>
          <span className="label">Login</span>
        </button>}
      {isPending &&  <button className='btn btn-form' disabled>
          <span className="transition"></span>
          <span className="gradient"></span>
          <span className="label">Loading</span>
      </button>}
      {/* {error && <p className='error'>{error}</p>} */}
   </form>
  )
}

export default Login