import React, { useState, useContext, createContext, useEffect } from "react";


// Create a new context to hold the exchange data and functions
const ExchangeContext = createContext();

  // Define a provider component that will wrap the entire app
  export function ExchangeProvider(props) {
    const [selectedExchange, setSelectedExchange] = useState(null);
    const [exchanges, setExchanges] = useState([]);

    // Function to add a new exchange
    function addExchange(exchange) {
      setExchanges((prevExchanges) => [...prevExchanges, exchange]);
    }

    // Function to remove a exchange by its ID
    function removeExchange(exchangeId) {
      setExchanges((prevExchanges) => prevExchanges.filter((exchange) => exchange.id !== exchangeId));
    }

    // Function to select a exchange by its ID
    function selectExchange(exchangeId) {
      setSelectedExchange(exchangeId);
    }

    useEffect(() => {
      fetch('/exchanges')
        .then((res) => {
          if (res.ok) {
            res.json()
              .then((data) => {
                setExchanges(data)
                console.log(data, "sidebar exchanges")
              });
          }
        });
    }, []);

    // Wrap the entire app with the ExchangeContext provider and pass the state and functions as values
    return (
      <ExchangeContext.Provider
        value={{ exchanges, setExchanges, addExchange, removeExchange, selectExchange }}
      >
        <div>
          {props.children}
        </div>
      </ExchangeContext.Provider>
    );
  }
 export default ExchangeContext;

