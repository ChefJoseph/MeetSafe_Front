import { Button } from "@mui/material";
import { useState } from "react";
import GMap from "../../Components/GMap/GMap";

function AddFormMapHolder({ map, setMap, origin, originAddress, midPoint }) {
  const [nearby, setNearby] = useState({});

  function searchNearby(type) {
    if (map && midPoint.lat !== undefined && midPoint.lng !== undefined) {
      fetch(
        `http://localhost:3000/search?lat=${midPoint.lat}&lng=${midPoint.lng}&radius=1500&type=${type}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "OK") {
            // console.log(data.results);
            setNearby({
              type: type,
              data: data.results,
            });
          } else {
            setNearby({});
            switch (type) {
              case "police":
                alert(`No Police Station nearby.`);
                break;
              case "fire_station":
                alert("No Fire Station nearby.");
                break;
              case "hospital":
                alert("No Hospital nearby.");
                break;
              default:
                break;
            }
          }
        });
    }
  }

  return (
    <>
      <Button variant="text" onClick={() => searchNearby("police")}>
        Police
      </Button>
      <Button variant="text" onClick={() => searchNearby("fire_station")}>
        Fire Station
      </Button>
      <Button variant="text" onClick={() => searchNearby("hospital")}>
        Hospitals
      </Button>
      <GMap
        map={map}
        setMap={setMap}
        origin={origin}
        originAddress={originAddress}
        midPoint={midPoint}
        width={"100%"}
        height={"100vh"}
        nearby={nearby}
      />
    </>
  );
}

export default AddFormMapHolder;
