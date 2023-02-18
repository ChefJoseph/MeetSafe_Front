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
  );
}

export default Index