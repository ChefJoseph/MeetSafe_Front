import React, { useState, useContext, useEffect } from "react";
import ExchangeContext from "../../ExchangeProvider";
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
import MeetSafeLogo from "../../Assets/MeetSafeLogo2.png";
import { useNavigate } from "react-router-dom";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

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

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

// function stringAvatar(name) {
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//     },
//     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//   };
// }
// End Avatar Config

export default function Index({
  open,
  setOpen,
  handleDrawerClose,
  handlerDraweOpen,
}) {
  // const theme = useTheme();
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/home");
  };
  const { exchanges, setExchanges, selectExchange, selectedExchange } =
    useContext(ExchangeContext);

  const handleClickAway = () => {
    if (open) {
      setOpen(false);
    }
  };

  function handleSelectExchange(ExchangeId) {
    selectExchange(ExchangeId);
    navigate("/exchange/" + ExchangeId);
  }
  console.log(open, "SideBar/AppBar.js");

  //   const handleDrawerOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleDrawerClose = () => {
  //     setOpen(false);
  //   };

  useEffect(() => {
    fetch("/exchanges").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setExchanges(data);
          // console.log(data, "sidebar exchanges")
        });
      }
    });
  }, []);

  console.log(exchanges);

  return (
    // <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown" touchEvent="onTouchStart">
    //   <div>
    <Box sx={{ display: "flex", zindex: -6 }}>
      <CssBaseline />

      <Drawer id="Drawer" variant="permanent" open={open}>
        <DrawerHeader
          id="DrawerHeader"
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <IconButton onClick={handleDrawerClose}>
            {open ? (
              <ChevronLeftIcon sx={{ fontSize: "35px" }} />
            ) : (
              <img src={MeetSafeLogo} alt="logo" onClick={handleHome} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Stack
          id="AvatarStack"
          direction="column"
          spacing={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 1,
            mb: 1,
          }}
        >
          {/* Sort and then map */}
          {exchanges
            ?.sort((a, b) => {
              const datea = new Date(a);
              const dateb = new Date(b);

              const amil = datea.getTime();
              const bmil = dateb.getTime();

              if (amil > bmil) {
                return 1;
              }
              if (amil < bmil) {
                return -1;
              }
              return 0;
            })
            .map((exchange) => (
              <ListItem
                key={exchange.id}
                disablePadding
                sx={{ display: "block" }}
                selected={exchange.id === selectedExchange}
                onClick={() => handleSelectExchange(exchange.id)}
              >
                <ListItemButton
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    key={exchange.id}
                    sx={{
                      bgcolor: stringToColor(`${exchange.user[1].username}`),
                    }}
                  >
                    {exchange.user[1].username.split(",")[0][0].toUpperCase()}
                  </Avatar>
                  <ListItemText
                    primary={exchange.user[1].username.toUpperCase()}
                    sx={{ textAlign: "center", opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </Stack>

        <Divider />

        <IconButton
          onClick={handleHome}
          sx={{ left: 0, bottom: 0, opacity: open ? 1 : 0 }}
        >
          <img src={MeetSafeLogo} alt="logo" />
        </IconButton>
      </Drawer>
    </Box>
    // </div>
    // </ClickAwayListener>
  );
}
