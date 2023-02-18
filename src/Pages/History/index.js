import React, { useState } from 'react'
import SideBar from '../../Components/SideBar'
import NavBar from '../../Components/NavBar'
import Box from '@mui/material/Box';
import { CssBaseline } from '@mui/material';
import HistoryCards from './HistoryCards';


function Index() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml:5 }}>
      <CssBaseline />
      <SideBar open={open} setOpen={setOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}/>
      <h1 component="main" sx={{ flexGrow: 1, p: 3 }}>Exchange History</h1>
      <HistoryCards/>
      <NavBar open={open} setOpen={setOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}/>
      </Box>
    </div>
  )
}

export default Index