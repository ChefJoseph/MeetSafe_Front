import React, { useRef, useState, useMemo, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid, Input, TextField, Typography, Autocomplete as AutocompleteInput } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import Button from "@mui/material/Button";
import AddFormMapHolder from "./AddFormMapHolder";
import useMidPointFinder from "../../CustomHooks/useMidPointFinder";
import { Autocomplete } from "@react-google-maps/api";
import { UserContext } from "../../Context/UserContext";
import { MapContext } from "../../Context/MapContext";
import { useNavigate } from "react-router-dom";

function AddForm() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const { isLoaded } = useContext(MapContext);
  const [timeValue, setTimeValue] = useState(dayjs(Date.now()));
  const [dateValue, setDateValue] = useState(dayjs(Date.now()));
  const [error, setError] = useState(null);
  const [startCoor, setStartCoor] = useState(null);
  const [endCoor, setEndCoor] = useState(null);
  const [address1, setAddress1] = useState(null);
  const [meetAddress, setMeetAddress] = useState(null);
  const [targetParty, setTargetParty] = useState(""); 

  const [filteredUsers,setFilteredUsers] = useState([])

  const [users,setUsers] = useState([])
  const [user,setUser] = useState("")

  // ref for party input
  const partyRef = useRef();
  const descriptionRef = useRef();

  // states and function for map
  const originRef = useRef();
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [nearby, setNearby] = useState({});
  const [midPoint, findMidPoint, findCoordinate] = useMidPointFinder();

  useEffect(()=> {
    fetch("users").then(resp=>resp.json()).then(data=> {
      setUsers(
        data.filter(user=>user.id !== currentUser.id).map(user=>{return {label:user.username,id:user.id}})
      )
    })
  },[])

  console.log(users)


  function addParty() {
    // if (partyRef.current.value) {
    //   if (partyRef.current.value === currentUser.username) {
    //     alert("Cannot add yourself");
    //     return;
    //   }
      if (user === "") return
      fetch(`users/find/${user}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            // console.log(data);
            setEndCoor({
              lat: parseFloat(data.lat),
              lng: parseFloat(data.lng),
            });
            setNearby({});
            setTargetParty(partyRef.current.value);
          }
        });
    // } else {
    //   alert("Please enter other party username");
    // }
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

  function sendInvite() {
    if (!midPoint) {
      alert("please pick a party");
    } else if (!meetAddress) {
      alert("please pick a meeting location");
    } else {
      const day = new Date(dateValue);
      const time = new Date(timeValue);
      console.log(dateValue);
      console.log(timeValue);

      const dayString =
        day.getMonth() + 1 + "-" + day.getDate() + "-" + day.getFullYear();

      const timeString = time.getHours() + ":" + time.getMinutes();

      const datetime = new Date(dayString + " " + timeString);

      const data = {
        address_1: address1,
        address_1_lat: startCoor.lat,
        address_1_lng: startCoor.lng,
        address_2_lat: endCoor.lat,
        address_2_lng: endCoor.lng,
        ...meetAddress,
        meettime: datetime,
        details: descriptionRef.current.value,
      };
      console.log(data);
      fetch(`/exchanges/new_meeting/${targetParty}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => navigate("/"));
    }
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
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3, maxWidth: "700px" }}>
        {isLoaded ? (
          <Box
            component="main"
            sx={{ display: "flex", flexDirection: "column", gap: 2, my: 2 }}
          >
            {/* <Grid container spacing={2}>
            <Grid item xs={6}> */}
            <h1>Create an invite</h1>
            <AutocompleteInput
            onChange={(e)=>setUser(e.target.innerText)}
              disablePortal
                id="combo-box"
                options={users}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField key={params.id} {...params} label="Username" />}
            />
            <Box>
              <Button colorScheme="pink" type="submit" onClick={addParty}>
                Add party
              </Button>
            </Box>
            <input
            ref={descriptionRef}
            style={{
              width: "100%",
              height: "50px",
              borderRadius: "5px",
              borderWidth: '1px',
              borderColor: 'rgb 0 0 0 0.36'
            }}
            placeholder={"Description"}
            ></input>


            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ mt: 2 }}>
              <Stack spacing={0}>
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
            <Box flexGrow={1} sx={{ marginTop: 1 }}>
              <Autocomplete id="autocomplete">
              <input
                  ref={originRef}
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "5px",
                    borderWidth: '1px',
                    borderColor: 'rgb 0 0 0 0.36'
                  }}
                  placeholder={"Your Address"}
                ></input>
              </Autocomplete>
            </Box>
            <Box>
              <Button type="submit" onClick={updateOrigin}>
                Update Origin
              </Button>
            </Box>
            <Box>
              {meetAddress ? (
                <>
                  <p>Meeting address: </p>
                  <p>{meetAddress.meeting_address}</p>
                </>
              ) : (
                <Typography>Please select a meeting location:</Typography>
              )}
            </Box>
            {/* </Grid> */}
            {/* <Grid item xs={12}> */}
            <Box>
              <AddFormMapHolder
                map={map}
                setMap={setMap}
                origin={startCoor}
                originAddress={address1}
                midPoint={midPoint}
                nearby={nearby}
                setNearby={setNearby}
                setMeetAddress={setMeetAddress}
              />
            </Box>
            {/* </Grid> */}
            <Box>
              <Button variant="contained" onClick={sendInvite}>
                Send Invite
              </Button>
            </Box>
            {/* </Grid> */}
          </Box>
        ) : (
          <h1>Loading...</h1>
        )}
      </Box>
    </Box>
  );
}

export default AddForm;
