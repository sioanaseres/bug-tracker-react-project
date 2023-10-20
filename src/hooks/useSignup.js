import { useState , useEffect} from "react"
import {useAuthContext} from "../hooks/useAuthContext"
import {toast} from "react-toastify"

//firebase imports
import {auth, db} from "../firebase/config"
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {collection, doc, setDoc} from "firebase/firestore"


export const useSignup = () =>{
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)

  const {dispatch} = useAuthContext()

  const signup = async (email, password, displayName) =>{
    setError(null)
    setIsPending(true)

    try {
        //signup user
       const res = await createUserWithEmailAndPassword(auth, email, password)
      
       if(!res) {
        throw new Error( "Could not complete signup")
       }

       // add display name to user
       await updateProfile(res.user, { displayName   });
    
       // create a user document
       await setDoc(doc(db, "users", res.user.uid), {
          online:true,
          displayName, 
       })

      // dispatch login action
       dispatch({type:"LOGIN" , payload: res.user})

       // update state
       if(!isCancelled){
        setError(null)
        setIsPending(false)
     
       }


    } catch (error) {

      if(!isCancelled){
        console.log(error.message)
        setError(error.message)
        setIsPending(false)
        toast.error(error.message)
      }
      
    }
 
    
  }

  // useEffect(()=>{
  //   return () =>   setIsCancelled(true)
  // }, [])
  
  return {error, signup, isPending}
}