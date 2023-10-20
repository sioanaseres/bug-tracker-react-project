import {useState, useEffect} from "react"
import { BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

//components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUsers from './components/OnlineUsers';


//pages
import CreateTask from "./pages/CreateTask"
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'
import Signup from './pages/Signup'
import BugList from './pages/Bugs';
import BugItem from './pages/BugItem';
import Charts from "./charts/Charts";
import LandingPage from "./pages/LandingPage"

function App() {

  const {authIsReady, user} = useAuthContext()

  // const handleBeforeUnload = (event) => {
  //   event.preventDefault();
  //   event.returnValue = '';
  //   window.location.href = 'https://stage-poker-staticcontent.safe-iplay.com/tools/qa-tool/index.html';
  // };



  // useEffect(() => {
      
  //   window.addEventListener('beforeunload', handleBeforeUnload);
 
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
    
  //   };
  // }, []);

  useEffect(() => {
    const handleUnload = () => {
        window.location.href = 'https://stage-poker-staticcontent.safe-iplay.com/tools/qa-tool/index.html';
    };
    window.addEventListener('unload', handleUnload);
    return () => {
        window.removeEventListener('unload', handleUnload);
    };
}, []);


  return (
    <div className="App">

  {authIsReady && (
      <BrowserRouter basename="/tools/qa-tool">
        {user &&<Sidebar></Sidebar>}
         <div className="container">
          <Navbar></Navbar>
          {!user   && <LandingPage />}
            <Routes>
        
              <Route path="/" element={ user ? <Dashboard />  :<Navigate to="login" replace={true} />}></Route>
              <Route path="/create" element={user? <CreateTask/> : <Navigate to="/" replace={true}/>}></Route>
              <Route path="/task/:tasknumber" element={user? <BugList/> : <Navigate to="/" replace={true}/>}></Route>
              <Route path="/task/:tasknumber/:id" element={user? <BugItem /> : <Navigate to="/" replace={true}/>}></Route>
              <Route path="/login" element={!user? <Login/> : <Navigate to="/" replace={true}/> }></Route>
              <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/" replace={true}/>}></Route>
              <Route path="/charts" element={user ? <Charts/> : <Navigate to="/" replace={true}/>}></Route>
            </Routes>

           </div>
           {user && <OnlineUsers></OnlineUsers>}

           <ToastContainer position="top-center"></ToastContainer>
      </BrowserRouter>
  )}
     
    </div>
  );
}

export default App;
