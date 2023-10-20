import {useState, useReducer, useEffect } from "react"
import {db, timestamp} from "../firebase/config"
import { collection , addDoc, updateDoc, doc, deleteDoc, query, where, getDocs} from "firebase/firestore"
import {toast} from "react-toastify"

let initialState = {
    document: null,
    isPending: false, 
    error: null,
    success: null
}

const firestoreReducer = (state, action) =>{
    switch (action.type) {
        case "IS_PENDING" :
         return { isPending: true, document: null, success: false, error: null}
        case "ADDED_DOCUMENT" :
          return { isPending: false, document: action.payload, success:true, error:null}
        case "UPDATED_DOCUMENT" :
            return {isPending: false, document: action.payload, success: true, error: null}
        case "DELETE_DOCUMENT" :
            return {isPending: false, document: action.payload, success: true, error: null}
        case "CHECK_TASK_NUMBER": 
            return {isPending: false, document: null, success: true, error: null}
        case "ERROR" :
          return { isPending: false, document: null, success:false, error:action.payload}
    
        default: 
        return state
    }
}
export const useFirestore = (c) =>{

const [response, dispatch] = useReducer(firestoreReducer, initialState)
const [isCancelled, setIsCancelled] = useState(false)

// collection ref
const ref = collection(db, c)

//only dispatch if not cancelled
const dispatchIfNotCancelled = (action) =>{
    if(!isCancelled){
        dispatch(action)
    }
}
// add a document
const addDocument = async (doc) =>{
dispatch({type:"IS_PENDING"})

try {
   
    const createdAt = timestamp.fromDate(new Date())
    const addedDocument = await addDoc(ref , {...doc, createdAt})
 
    dispatchIfNotCancelled({type:"ADDED_DOCUMENT", payload: addedDocument})
} catch (error) {
    dispatchIfNotCancelled({type:"ERROR", payload:error.message})
}
}

//delete a document
const deleteDocument = async (id) =>{
dispatch({type:"IS_PENDING"})

try {
    const ref = doc(db, c, id)
    const deletedBug = await deleteDoc(ref)
    dispatchIfNotCancelled({type:"DELETE_DOCUMENT", payload:deletedBug})
} catch (error) {
    dispatchIfNotCancelled({type:"ERROR", payload:"could not delete"})
    toast.error("You can delete only your documents.")
}
}

//update document
 const updateDocument = async (id, updates) =>{
    dispatch({type:"IS_PENDING"})

    try {
        const updatedDocument = await updateDoc(doc(ref, id), updates)
        dispatchIfNotCancelled({type:"UPDATED_DOCUMENT", payload:updatedDocument})
        
        return updatedDocument
        
    } catch (error) {
        console.log(error)
        dispatchIfNotCancelled({type:"ERROR", payload: error.message})
        return null
    }
 }


 // check if task number exists 

 const checkTaskNumberExists = async (taskNumber) => {
    dispatch({type:"IS_PENDING"})
    try {
      const q = query(ref, where('taskNumber', '==', taskNumber));
      const querySnapshot = await getDocs(q);
      dispatchIfNotCancelled({type:"CHECK_TASK_NUMBER"})
      return !querySnapshot.empty;
    } catch (error) {
        dispatchIfNotCancelled({type:"ERROR", payload: error.message})
        return null
    }
  };
// useEffect(()=>{
//  return () =>{
//     setIsCancelled(true)
//  }
// }, [])

return {addDocument, deleteDocument, updateDocument, checkTaskNumberExists, response}
}
