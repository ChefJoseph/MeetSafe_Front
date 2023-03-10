import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import GMap from "../../Components/GMap/GMap";
import { Button } from "@mui/material";
import { UserContext } from "../../Context/UserContext";
import { MapContext } from "../../Context/MapContext";

function HomeContent() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isLoaded } = useContext(MapContext);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [center, setCenter] = useState(null);

  useEffect(() => {
    if (currentUser.id && currentUser.lat && currentUser.lng) {
      setCenter({
        lat: parseFloat(currentUser.lat),
        lng: parseFloat(currentUser.lng),
      });
    }
  }, [currentUser]);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      {center && isLoaded ? (
        <>
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
        </>
      ) : (
        <h1>Please enter your default address</h1>
      )}
    </Box>
  );
}

export default HomeContent;
