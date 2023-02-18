import React, { useRef, useState, useMemo, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Input, TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import Button from "@mui/material/Button";
import AddFormMapHolder from "./AddFormMapHolder";
import useMidPointFinder from "../../CustomHooks/useMidPointFinder";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { UserContext } from "../../Context/UserContext";

function AddForm() {
  const { currentUser } = useContext(UserContext);
  const [timeValue, setTimeValue] = useState(dayjs(Date.now()));
  const [dateValue, setDateValue] = useState(dayjs(Date.now()));
  const [error, setError] = useState(null);
  const [startCoor, setStartCoor] = useState(null);
  const [endCoor, setEndCoor] = useState(null);
  const [address1, setAddress1] = useState(null);

  // ref for party input
  const partyRef = useRef();

  // states and function for map
  const originRef = useRef();
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [nearby, setNearby] = useState({});
  const [midPoint, findMidPoint, findCoordinate] = useMidPointFinder();

  function addParty() {
    if (partyRef.current.value) {
      fetch(`users/find/${partyRef.current.value}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setEndCoor({
              lat: parseFloat(data.lat),
              lng: parseFloat(data.lng),
            });
          }
        });
    } else {
      alert("Please enter other party username");
    }
  }

  function updateOrigin() {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${originRef.current.value
        .split(" ")
        .join("+")}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("updating origin", data);
        setStartCoor(data.results[0].geometry.location);
        setAddress1(originRef.current.value);
        setNearby({});
      });
  }

  useEffect(() => {
    if (currentUser.lat && currentUser.lng) {
      setStartCoor({
        lat: parseFloat(currentUser.lat),
        lng: parseFloat(currentUser.lng),
      });
    }
    if (currentUser.address) {
      setAddress1(
        currentUser.address + " " + currentUser.state ||
          "" + " " + currentUser.zip_code ||
          ""
      );
    }
  }, [currentUser]);

  useEffect(() => {
    if (startCoor && endCoor) {
      findMidPoint(startCoor, endCoor);
    }
  }, [startCoor, endCoor]);

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  console.log(error, "addform time error");

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <h1>Create an invite</h1>
      {/* <h4>User Field</h4> */}
      <input
        ref={partyRef}
        style={{
          width: "100%",
          height: "50px",
          borderRadius: "5px",
          borderWidth: "2px",
        }}
        placeholder={"username"}
      ></input>
      <Box>
        <Button colorScheme="pink" type="submit" onClick={addParty}>
          Add party
        </Button>
      </Box>
      <h4>Description</h4>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={1}>
          <MobileDatePicker
            label="Date"
            value={dateValue}
            onChange={(newValue) => {
              setDateValue(newValue);
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
            value={timeValue}
            onChange={(newValue) => {
              setTimeValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            minTime={dayjs(Date.now())}
            onError={(newError) => setError(newError)}
          />
        </Stack>
      </LocalizationProvider>
      <Box flexGrow={1} sx={{ marginTop: 3 }}>
        <Autocomplete>
          <input
            ref={originRef}
            style={{
              width: "100%",
              height: "50px",
              borderRadius: "5px",
              borderWidth: "2px",
            }}
          ></input>
        </Autocomplete>
      </Box>
      <Box>
        <Button colorScheme="pink" type="submit" onClick={updateOrigin}>
          Update Origin
        </Button>
      </Box>
      <AddFormMapHolder
        map={map}
        setMap={setMap}
        origin={startCoor}
        originAddress={address1}
        midPoint={midPoint}
        nearby={nearby}
        setNearby={setNearby}
      />
      <Button>Send Invite</Button>
    </Box>
  );
}

export default AddForm;
