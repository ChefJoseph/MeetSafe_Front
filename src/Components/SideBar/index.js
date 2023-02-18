import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import EmojiEmotionsOutlinedIcon from '@mui/icons-material/MoveToInbox';
import MeetSafeLogo from '../../Assets/MeetSafeLogo2.png'
import { useNavigate } from 'react-router-dom';
import ClickAwayListener from '@mui/base/ClickAwayListener';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const drawerWidth = 150;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// Avatar config
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }


// End Avatar Config 

export default function Index({open, setOpen, handleDrawerClose, handlerDraweOpen}) {
  // const theme = useTheme();
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/home");
  };

  const handleClickAway = () => {
    if (open) {
      setOpen(false);
    }
  };
  console.log(open, "SideBar/AppBar.js");


  return (
    // <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown" touchEvent="onTouchStart">
    //   <div>
    <Box sx={{ display: "flex", zindex: -6 }}>
      <CssBaseline />

      <Drawer id="Drawer" variant="permanent" open={open}>
        <DrawerHeader id="DrawerHeader" sx={{alignItems:'center', justifyContent:'center'}}>
          <IconButton onClick={handleDrawerClose} >
            {open ? (
              <ChevronLeftIcon sx={{ fontSize: "35px" }} />
            ) : (
              <img src={MeetSafeLogo} alt="logo" onClick={handleHome} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <IconButton onClick={handleHome} sx={{left: 0, bottom: 0,  opacity: open ? 1 : 0}}>
          <img src={MeetSafeLogo} alt="logo" />
        </IconButton>
      </Drawer>
    </Box>
    // </div>
    // </ClickAwayListener>
  );
}
