import React, {useState , useEffect} from 'react'


function HistoryCards() {
  const [userExchanges, setUserExchanges] = useState(null)

  useEffect(() => {
    fetch('/history').then(res => res.json()).then(res => setUserExchanges(res))
  }, []);
  
  return (
    <div>
        HistoryCards
    </div>
  )
}

export default HistoryCards