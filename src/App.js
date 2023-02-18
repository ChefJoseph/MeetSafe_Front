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
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


function App() {
  
  //Check if user is logged in 

  // useEffect(()=> {
  //   fetch("/login").then(resp=> {
  //     if (resp.ok) {
  //       const userObj = resp.json()
  //     }
  //     else {

  //     }
  //   })
  // })
  
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
