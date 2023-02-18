import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import ExchangeContext from '../../ExchangeProvider'
import { Box, Button, TextField, Typography } from '@mui/material';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import { useCurrentLocation } from '../../CustomHooks/usecurrentlocation';
// import TransitionsModal from './checkface';

const containerStyle = {
  width: '100%',
  height: '400px',
  margin: '20px 0',
};

function ExchangeContent() {
	const navigate = useNavigate();
	const { exchange_id } = useParams()
	const [lat,lng] = useCurrentLocation()
  const { exchanges } = useContext(ExchangeContext);
  const currentExchange = exchanges.filter((exchange) => exchange.id == exchange_id);
  console.log(currentExchange)
	const [username, setUsername] = useState('John Doe');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [details, setDetails] = useState('Jordan 3s size 10 Red/Black');
  const [location, setLocation] = useState('123 Main St, Anytown USA');
	const [editMode, setEditMode] = useState(false);
	const [response, setResponse] = useState(null);

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
	
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    fetch('/exchanges/' + exchange_id, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				meettime: date,
				details: details,
				meeting_address: location,
			})
		})
		.then(response => response.json())
		.then(data => {
			setResponse(data);
			setEditMode(false);
		})
		.catch(error => {
			console.error(error);
		});
  };

  const handleDeleteClick = () => {
		fetch('/exchanges/' + exchange_id, {
			method: 'DELETE'})
		.then(() => {
			navigate('/home')
		})
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4">Exchange title</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
          <TextField
            label="Username"
            value={username}
            disabled
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Date"
            value={date}
            disabled={!editMode}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Time"
            value={time}
            disabled={!editMode}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Details"
            value={details}
            multiline
            rows={4}
            disabled={!editMode}
            onChange={(e) => setDetails(e.target.value)}
          />

          <TextField
            label="Location"
            value={location}
            disabled={!editMode}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Typography>
            <button onClick={handleLocation}>Here</button>
          </Typography>

          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
            <GoogleMap mapContainerStyle={containerStyle} center={{ lat: 37.7749, lng: -122.4194 }} zoom={10} />
          </LoadScript>

          {editMode ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={handleSaveClick}>
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={handleEditClick}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={handleDeleteClick}>
                Delete
              </Button>
              {/* <Button onClick={handleOpen} variant="contained" color="error">
                Present
              </Button> */}
            </Box>
          )}
        </Box>
      </Box>
    {/* <TransitionsModal open = {open} handleClose={handleClose}/> */}
    </>
  )
}

export default ExchangeContent