import React, { useContext } from 'react'
import ExchangeContext from '../../ExchangeProvider'
import { Toolbar, Typography } from '@mui/material';

function Index() {
  const { selectedExchange, exchanges } = useContext(ExchangeContext);
  const currentExchange = exchanges.find((exchange) => exchange.id === selectedExchange);

  return (
    <main >
      <Toolbar />
      {currentExchange ? (
        <div>
          <Typography variant="h4" component="h1">
           {currentExchange.id}
            </Typography>
            <p>Exchange content goes here</p>
        </div>
      ) : (
        <p>No exchange selected</p>
      )}
    </main>
  );
}

export default Index