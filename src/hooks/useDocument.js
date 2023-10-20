import {useState, useEffect} from "react"
import {db} from "../firebase/config"
import {collection, doc, onSnapshot} from "firebase/firestore"


export const useDocument = (c, id) =>{

    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)


    //realtime data for document

    useEffect(()=>{
        let ref = doc(collection(db, c ), id)
       
         const unsub = onSnapshot(ref, (snapshot)=>{
      
           if(snapshot.data()){
          setDocument({...snapshot.data(), id:snapshot.id})
       
            setError(null)
           }
          else{
            setError("no such task exists")
          }
                
                 
         }, (error)=>{
            console.log(error.message)
            setError("failed to get document")
        })

        return () => unsub()

    }, [c, id])

    return {document, error}
}