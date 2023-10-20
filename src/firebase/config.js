
import {initializeApp} from 'firebase/app'
import {getFirestore, Timestamp} from 'firebase/firestore'
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyC0I72SJHn86Z7Egb85vcyA6nUTnFq2MVc",
    authDomain: "newqatool.firebaseapp.com",
    projectId: "newqatool",
    storageBucket: "newqatool.appspot.com",
    messagingSenderId: "451056630983",
    appId: "1:451056630983:web:a1252f2a5b7e885ef2d2e2"
  };

  // init firebase app
  initializeApp(firebaseConfig)

  // init firestore
  const db = getFirestore()

    // init firebase auth
  const auth = getAuth()


  // timestamp
  const timestamp = Timestamp
 export {db, auth, timestamp}