import React, { useState } from "react";
import Box from "@mui/material/Box";
import GMap from "../../Components/GMap/GMap";
import { Button } from "@mui/material";

function HomeContent() {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  // user home location
  const center = { lat: 40.7477, lng: -73.9869 };

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
