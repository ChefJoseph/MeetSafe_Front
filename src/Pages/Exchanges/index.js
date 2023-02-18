import React, { useContext } from 'react'
import ExchangeContext from '../../ExchangeProvider'
import { Toolbar, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

function Index() {
  const { exchange_id } = useParams()
  const { exchanges } = useContext(ExchangeContext);
  const currentExchange = exchanges.filter((exchange) => exchange.id == exchange_id);
  // console.log(exchange_id)
  console.log(currentExchange)

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
        </div>
      ) : (
        <p>No exchange selected</p>
      )}
    </main>
  );
}

export default Index