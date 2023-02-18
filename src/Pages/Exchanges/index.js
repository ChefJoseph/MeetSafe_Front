<<<<<<< HEAD
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

=======
import React, { useContext } from 'react'
import ExchangeContext from '../../ExchangeProvider'
import { Toolbar, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useCurrentLocation } from '../../CustomHooks/usecurrentlocation';

function Index() {
  const { exchange_id } = useParams()
  const [lat,lng] = useCurrentLocation()
  const { exchanges } = useContext(ExchangeContext);
  const currentExchange = exchanges.filter((exchange) => exchange.id == exchange_id);
  // console.log(exchange_id)
  console.log(currentExchange)
>>>>>>> e43f1167bec7337e3936e52ce052a451aac53e56

  function handleLocation(e) {
    //Check against backend exchange to see if in range
    fetch("/exchanges/location",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "lat":lat,
        "lng":lng,
        "exchange_id":exchange_id
      })
    }).then(resp=>resp.json()).then(data=>console.log(data))
  }

  return (
<<<<<<< HEAD
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
=======
    <main >
      <Toolbar />
      {currentExchange ? (
        <div>
          <Typography variant="h4" component="h1">
           {currentExchange.id}
            </Typography>
            <p>Exchange content goes here</p>
            <p> Chat should be here</p>
            <p> Map which is centered on meetup location </p>
            <button onClick={handleLocation}>Here</button>
        </div>
      ) : (
        <p>No exchange selected</p>
      )}
    </main>
>>>>>>> e43f1167bec7337e3936e52ce052a451aac53e56
  );
}

export default Index