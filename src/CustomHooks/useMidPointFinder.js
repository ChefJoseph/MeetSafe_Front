import { useState } from "react";

function useMidPointFinder() {
  const [midPoint, setMidPoint] = useState(null);

  async function findCoordinate(address, setCo) {
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address
        .split(" ")
        .join("+")}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("finding coordinates", data);
        const lat = data.results[0].geometry.location.lat;
        const lng = data.results[0].geometry.location.lng;
        setCo({ lat, lng });
      });
  }

  function findMidPoint(startCoor, endCoor) {
    const lat = (startCoor.lat + endCoor.lat) / 2;
    const lng = (startCoor.lng + endCoor.lng) / 2;
    console.log("finding mid-point", { lat, lng });
    setMidPoint({ lat, lng });
  }

  return [midPoint, findMidPoint, findCoordinate];
}

export default useMidPointFinder;
