import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Profile from './Pages/Profile'
import AddExchange from './Pages/AddExchange'
import Exchanges from './Pages/Exchanges'
import History from './Pages/History'
import Notifications from './Pages/Notifications'
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from './Context/UserContext';
import { useNavigate } from 'react-router-dom';

function App() {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate()


  // useEffect(()=> {

  // })
  //Check if user is logged in 

  useEffect(()=> {
    fetch("/auth").then(resp=> resp.json()).then( userObj =>
      {
          if (!userObj.errors) {
            setCurrentUser(userObj)
            navigate("/home")
          }
          else {
            navigate("/login")
          }
        }
    ).catch(()=>{
      navigate("/login")
    })
  },[])
  
  return (
    <Routes>
      <Route path="/#" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/*" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>

      <Route path="/profile" element={<Profile/>}/>
      <Route path="/add" element={<AddExchange/>}/>
      <Route path="/exchange/:exchange_id" element={<Exchanges/>}/>
      <Route path="/history" element={<History/>}/>
      <Route path="/notifications" element={<Notifications/>}/>
    </Routes>
  );
}

export default App;
