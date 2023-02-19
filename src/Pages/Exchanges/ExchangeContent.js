import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExchangeContext from "../../ExchangeProvider";
import { Box, Button, TextField, Typography } from "@mui/material";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import { useCurrentLocation } from "../../CustomHooks/usecurrentlocation";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import GMap from "../../Components/GMap/GMap";

const containerStyle = {
  width: "100%",
  height: "400px",
  margin: "20px 0",
};

function ExchangeContent() {
  const navigate = useNavigate();
  const { exchange_id } = useParams();
  const [lat, lng] = useCurrentLocation();
  const { exchanges } = useContext(ExchangeContext);
  const currentExchange = exchanges.filter(
    (exchange) => exchange.id === exchange_id
  );
  // console.log(exchange_id)
  console.log(currentExchange, "exchangecontent");
  const [username, setUsername] = useState("John Doe");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);

  function handleLocation(e) {
    //Check against backend exchange to see if in range
    fetch("/exchanges/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: lat,
        lng: lng,
        exchange_id: exchange_id,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  }

  useEffect(() => {
    fetch("/exchanges/" + exchange_id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.user, "/exchange get user")
        // console.log(data.user[1].username, "/exchange get username")
        setUsername(data.user[1].username);
        setDate(data.meettime);
        setTime(data.meettime);
        setDetails(data.details);
        setLocation(data.meeting_address);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    fetch("/exchanges/" + exchange_id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meettime: date,
        details: details,
        meeting_address: location,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data);
        setEditMode(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteClick = () => {
    fetch("/exchanges/" + exchange_id, {
      method: "DELETE",
    }).then(() => {
      navigate("/home");
    });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ p: 2 }}>
        {/* <Typography variant="h4">Exchange title</Typography> */}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, my: 2 }}>
          <Typography variant="h4">{username.toUpperCase()}</Typography>
          <Typography variant="h8">Review rating</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={1}>
              <MobileDatePicker
                label="Date"
                value={date}
                disabled={!editMode}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                minDate={dayjs(Date.now())}
                onError={(newError) => {
                  setError(newError);
                  console.log(newError);
                }}
              />
              <br />
              <MobileTimePicker
                label="Time"
                value={time}
                disabled={!editMode}
                sx={{
                  "&. Mui-disabled": {
                    color: "rgba(0, 0, 0, 1)", // (default alpha is 0.38)
                  },
                }}
                onChange={(newValue) => {
                  setTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                minTime={dayjs(Date.now())}
                onError={(newError) => setError(newError)}
              />
              <TextField
                label="Details"
                value={details}
                sx={{
                  "&. Mui-disabled": {
                    color: "rgba(0, 0, 0, 1)", // (default alpha is 0.38)
                  },
                }}
                multiline
                rows={3}
                disabled={!editMode}
                onChange={(e) => setDetails(e.target.value)}
              />
              <br />

              <TextField
                label="Location"
                value={location}
                disabled={!editMode}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Typography>
                <button onClick={handleLocation}>Here</button>
              </Typography>
            </Stack>
          </LocalizationProvider>
          {/* <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{ lat: 37.7749, lng: -122.4194 }}
              zoom={10}
            />
          </LoadScript> */}
          <Box sx={{ width: "100%", height: "500px" }}>
            <GMap
              map={map}
              setMap={setMap}
              origin={{ lat, lng }}
              midPoint={null}
              width={"100%"}
              height={"100%"}
              nearby={{}}
            />
          </Box>

          {editMode ? (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" onClick={handleSaveClick}>
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" onClick={handleEditClick}>
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
              <Button onClick={handleOpen} variant="contained" color="error">
                Present
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      {/* <TransitionsModal open = {open} handleClose={handleClose}/> */}
    </>
  );
}

export default ExchangeContent;
