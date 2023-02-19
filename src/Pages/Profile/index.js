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
  const navigate = useNavigate()

  function handleLogout() {
    fetch("/logout",{method:"DELETE"}).then(resp => {
      if (resp.ok) {
        setCurrentUser({})
        navigate("/login")

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
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml:5 }}>
      <CssBaseline />
      <SideBar open={open} setOpen={setOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}/>
      <ProfileInfo currentUser={currentUser}/>
      <NavBar open={open} setOpen={setOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}/>
      <Button onClick={handleHistoryPage}>Exchange History</Button>
      <LogoutIcon onClick={handleLogout}>Logout</LogoutIcon>
      </Box>
      
      

    </div>
  )
}

export default Index