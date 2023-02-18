import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Paper from '@mui/material/Paper';

function Index({open, setOpen, handleDrawerClose, handleDrawerOpen}) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleAddPage= () => {
    navigate('/add')
  }
  const handleProfilePage = () => {
    navigate('/profile')
  }




  return (
    <Box sx={{ pb: 7}} >
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0,  zIndex: 13000}} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Meets"  icon={<CompareArrowsIcon />} onClick={handleDrawerOpen} />
          <BottomNavigationAction label="New Meets" icon={<AddCircleOutlineOutlinedIcon />} 
          onClick={handleAddPage} />
          <BottomNavigationAction label="Profile" icon={<PermIdentityIcon />} onClick={handleProfilePage}/>
        </BottomNavigation>
      </Paper>
    </Box>
  );

}

export default Index