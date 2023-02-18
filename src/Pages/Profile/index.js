import React, { useState } from 'react'
import SideBar from '../../Components/SideBar'
import ProfileInfo from './ProfileInfo'
import NavBar from '../../Components/NavBar'
import Box from '@mui/material/Box';
import { CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Index() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

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
      <ProfileInfo/>
      <NavBar open={open} setOpen={setOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}/>
      <Button onClick={handleHistoryPage}>Exchange History</Button>
      </Box>
      
      

    </div>
  )
}

export default Index