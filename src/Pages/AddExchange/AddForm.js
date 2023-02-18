import React, { useRef, useState, useMemo } from "react";
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

function AddForm() {
  const [timeValue, setTimeValue] = useState(dayjs(Date.now()));
  const [dateValue, setDateValue] = useState(dayjs(Date.now()));
  const [error, setError] = useState(null);

  // test data for MidPointFinder
  const [startCoor, setStartCoor] = useState({
    lat: 40.7052878,
    lng: -74.013904,
  });
  const [endCoor, setEndCoor] = useState({
    lat: 40.7527277,
    lng: -73.97723529999999,
  });
  const [address1, setAddress1] = useState(
    "11 Broadway 2nd floor New York NY 10004"
  );
  const [address2, setAddress2] = useState("89 E 42nd St New York NY");

  // states and function for map
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [findMidPoint] = useMidPointFinder(
    // user lat lng from database
    startCoor,
    // invite target lat lng from database
    endCoor,
    address1,
    address2
  );
  // const [findMidPoint] = useMidPointFinder({}, {}, address1, address2);
  const [midPoint, setMidPoint] = useState({});

  function checkMidPoint() {
    const mid = findMidPoint();
    console.log(mid);
    setMidPoint(mid);
  }

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  console.log(error, "addform time error")

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <h1>Create an invite</h1>
      <h4>User Field</h4>
      <h4>Description</h4>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={1}>
          <MobileDatePicker
            label="Date"
            value={dateValue}
            onChange={(newValue) => {
              setDateValue(newValue);
            }}
            renderInput={(params) => <TextField {...params}/>}
            minDate={dayjs(Date.now())}
            onError={(newError) => {
              setError(newError)
              console.log(newError)
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
      <Box flexGrow={1} sx={{ padding: 1 }}>
        {/* <Autocomplete> */}
        <TextField variant="outlined" type="text" placeholder="Origin" />
        {/* </Autocomplete> */}
      </Box>
      <Box>
        <Button colorScheme="pink" type="submit">
          Update Origin
        </Button>
      </Box>
      <AddFormMapHolder
        map={map}
        setMap={setMap}
        origin={startCoor}
        midPoint={midPoint}
      />
      <Box>
        <Button onClick={checkMidPoint}>Test MidPoint</Button>
      </Box>
      <Button>Send Invite</Button>
    </Box>
  );
}

export default AddForm;