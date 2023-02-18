import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import GMap from "../../Components/GMap/GMap";
import { Button } from "@mui/material";
import { UserContext } from "../../Context/UserContext";

function HomeContent() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [center, setCenter] = useState(null);
  // user home location
  // const center = { lat: 40.7477, lng: -73.9869 };

  // TODO
  // this is for dummy data, delete after login is done
  useEffect(() => {
    fetch("/users/1")
      .then((res) => res.json())
      .then((data) => setCurrentUser(data));
  }, []);

  useEffect(() => {
    if (currentUser.id) {
      setCenter({
        lat: parseFloat(currentUser.lat),
        lng: parseFloat(currentUser.lng),
      });
    }
  }, [currentUser]);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Button onClick={() => map.panTo(center)}>Back to Center</Button>
      <GMap
        map={map}
        setMap={setMap}
        origin={center}
        midPoint={null}
        width={"100%"}
        height={"100%"}
        nearby={{}}
      />
    </Box>
  );
}

export default HomeContent;
