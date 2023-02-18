import React, { useState } from 'react'
import SideBar from '../../Components/SideBar'
import NavBar from '../../Components/NavBar'
import AddForm from './AddForm'
import Box from '@mui/material/Box';
import { CssBaseline } from '@mui/material';

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
      <Box component="main" sx={{ flexGrow: 1, p: 3 , ml: 5}}>
      <CssBaseline />
      <SideBar open={open} setOpen={setOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}/>
      <AddForm/>
      <NavBar open={open} setOpen={setOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}/>
      </Box>
    </div>
  )
}

export default Index