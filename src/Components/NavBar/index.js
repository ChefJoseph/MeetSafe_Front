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
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';

// function refreshMessages() {
//     const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
  
//     return Array.from(new Array(50)).map(
//       () => messageExamples[getRandomInt(messageExamples.length)],
//     );
//   }

function Index({open, setOpen, handleDrawerClose, handleDrawerOpen}) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleAddPage= () => {
    navigate('/add')
  }
  const handleProfilePage = () => {
    navigate('/profile')
  }
//   const [messages, setMessages] = React.useState(() => refreshMessages());

//   React.useEffect(() => {
//     ref.current.ownerDocument.body.scrollTop = 0;
//     setMessages(refreshMessages());
//   }, [value, setMessages]);



  return (
    <Box sx={{ pb: 7}} >
      <CssBaseline />
      {/* <List>
        {messages.map(({ primary, secondary, person }, index) => (
          <ListItem button key={index + person}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={person} />
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItem>
        ))}
      </List> */}
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