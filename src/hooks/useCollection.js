import {useState, useEffect, useRef} from "react"
import {collection, onSnapshot, query, where, orderBy} from "firebase/firestore"
import {db} from "../firebase/config"

export const useCollection = (c,  _orderBy) =>{
const [documents, setDocuments] = useState(null)
const [error, setError] = useState(null)

// const queryArray = useRef(_queryArray).current
const orderByE = useRef(_orderBy).current

useEffect(()=>{
    let ref = collection(db, c)

// if(queryArray){
//     ref = query(ref, where(...queryArray))
// }
if(orderByE){
    ref = query(ref, orderBy(...orderByE))
    

}
    const unsubscribe = onSnapshot(ref, (snapshot)=>{
        let results = []
        snapshot.docs.forEach(doc =>{
            results.push({...doc.data(), id: doc.id})
        })
        
    // update state
        setDocuments(results)
        setError(null)
    }, (error)=>{
        console.log(error)
        setError("could not fetch the data")
    })

    // unsubscribe on unmount
    return () => unsubscribe()
}, [c,  orderByE])

return {documents, error}
}