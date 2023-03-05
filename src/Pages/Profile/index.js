import React, { useState } from 'react'
import SideBar from '../../Components/SideBar'
import ProfileInfo from './ProfileInfo'
import NavBar from '../../Components/NavBar'
import Box from '@mui/material/Box';
import { CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

//Get from context and display

function Index() {

  const { currentUser, setCurrentUser } = useContext(UserContext);


  const [open, setOpen] = useState(false);
  const [edit,setEdit] = useState(false)

  const navigate = useNavigate()

  function handleLogout() {
    fetch("/logout",{method:"DELETE"}).then(resp => {
      if (resp.ok) {
        setCurrentUser({})
        navigate("/login",{ replace: true })

      }
      else {
        console.log("failed to logout")
      }
    }
    )
  }

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleHistoryPage = () => {
    navigate('/history')
  }
  return (
    <div style={{display:'grid',justifyContent:"center",alignItems:"center",marginTop:"10%"}}>
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml:5, borderRadius:"10px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
      <CssBaseline />
      <SideBar open={open} setOpen={setOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}/>
      <ProfileInfo edit={edit} currentUser={currentUser}/>
      <NavBar open={open} setOpen={setOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}/>
      <Button onClick={handleHistoryPage}>Exchange History</Button>
      <Button onClick={()=>setEdit(!edit)}> {edit ? "Edit Address" : "Edit Details" } </Button>
      <LogoutIcon sx= {{marginLeft:"40%"}} onClick={handleLogout}>Logout</LogoutIcon>
      </Box>
      
      

    </div>
  )
}

export default Index