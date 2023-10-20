import {useState, useEffect} from "react"
import {useAuthContext} from "./useAuthContext"
import {auth, db} from "../firebase/config"
import {signInWithEmailAndPassword} from "firebase/auth"
import {doc, updateDoc} from "firebase/firestore"
import {toast} from "react-toastify"

export const useLogin = () =>{
 const [isCancelled, setIsCancelled] = useState(false)
 const [error, setError] = useState(null)
 const [isPending, setIsPending] = useState(false)

 const {dispatch} = useAuthContext()

 const login = async(email, password) =>{
    setError(null)
    setIsPending(true)

    //sign user in

    try {
    const res = await signInWithEmailAndPassword(auth, email, password)

    // update online status
    await updateDoc(doc(db, "users", res.user.uid), {online:true})
     //dispatch login action

     dispatch({type:"LOGIN", payload: res.user})
    console.log(isCancelled)
     //updated state
     if(!isCancelled){
        setIsPending(false)
        setError(null)
     }
    

    } catch (error) {
    
        if(!isCancelled){
            console.log(error)
            setError(error.message)
            setIsPending(false)
            toast.error(error.message)
           
        }
     
    }
    }

    // useEffect(() => {
    //     return () =>setIsCancelled(true)
    // }, [])

    return {login, error, isPending}
}