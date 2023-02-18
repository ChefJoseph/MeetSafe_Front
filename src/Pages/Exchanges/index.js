import React, { useState } from 'react'

import SideBar from '../../Components/SideBar'
import NavBar from '../../Components/NavBar'
import ExchangeContent from './ExchangeContent'
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
  <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 5, height: "90vh" }}>
    <CssBaseline />
    <SideBar
      open={open}
      setOpen={setOpen}
      handleDrawerClose={handleDrawerClose}
      handleDrawerOpen={handleDrawerOpen}
    />
    <ExchangeContent />
    <NavBar
      open={open}
      setOpen={setOpen}
      handleDrawerClose={handleDrawerClose}
      handleDrawerOpen={handleDrawerOpen}
    />
  </Box>
  );
}

export default Index