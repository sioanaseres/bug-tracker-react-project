import {useState, useEffect} from "react"
import {useAuthContext} from "./useAuthContext"
import {auth ,db} from "../firebase/config"
import {signOut} from "firebase/auth"
import {doc, updateDoc} from "firebase/firestore"

export const useLogout = () =>{
 const [isCancelled, setIsCancelled] = useState(false)
 const [error, setError] = useState(null)
 const [isPending, setIsPending] = useState(false)

 const {dispatch, user} = useAuthContext()


 const logout = async() =>{
    setError(null)
    setIsPending(true)

    //sign user out

    try {
    //update online status
    const {uid} = user;

    await updateDoc(doc(db, "users", uid), {online: false})

     await signOut(auth)

     //dispatch logout action

     dispatch({type:"LOGOUT"})

     //updated state
     if(!isCancelled){
        setIsPending(false)
        setError(null)
     }
    

    } catch (error) {
    
        if(!isCancelled){
            setError(error.message)
            setIsPending(false)
            console.log(error.message)
        }
     
    }
    }

    // useEffect(() => {
    //     return () =>{
    //         setIsCancelled(true)
    //     }
    // }, [])

    return {logout, error, isPending}
}