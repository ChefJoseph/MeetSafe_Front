import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../Context/MapContext";

function GMap({
  setMap,
  origin,
  originAddress,
  midPoint,
  width,
  height,
  nearby,
  setMeetAddress,
}) {
  const { isLoaded, loadError } = useContext(MapContext);
  const [center, setCenter] = useState(origin);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    setDirectionsResponse(null);
    setDistance(null);
    setDuration(null);
    setSelectedMarker(null);
  }, [midPoint]);

  useEffect(() => {
    if (midPoint) {
      setCenter(midPoint);
    } else {
      setCenter(origin);
    }
  }, [origin, midPoint]);

  const iconUrl = {
    police:
      "https://img.icons8.com/external-nawicon-flat-nawicon/64/null/external-police-station-location-nawicon-flat-nawicon.png",
    fire_station:
      "https://img.icons8.com/external-tulpahn-outline-color-tulpahn/64/null/external-fire-station-building-tulpahn-outline-color-tulpahn.png",
    hospital: "https://img.icons8.com/dusk/64/null/hospital-2.png",
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  // const { isLoaded, loadError } = useJsApiLoader({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  //   libraries: ["places"],
  // });

  const showMarkers = nearby.data
    ? nearby.data.slice(0, 5).map((marker) => (
        <Marker
          key={marker.place_id}
          vicinity={marker.vicinity}
          position={{
            lat: marker.geometry.location.lat,
            lng: marker.geometry.location.lng,
          }}
          icon={{
            url: iconUrl[nearby.type],
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
          animation={window.google.maps.Animation.DROP}
          onClick={() => {
            setSelectedMarker(marker);
            setCenter({
              lat: marker.geometry.location.lat,
              lng: marker.geometry.location.lng,
            });
            calculateRoute({
              lat: marker.geometry.location.lat,
              lng: marker.geometry.location.lng,
            });
          }}
        />
      ))
    : null;

  // directions
  async function calculateRoute(destination) {
    if (!origin || !destination) {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function pickLocation() {
    const meetLocation = {
      meeting_address: selectedMarker.vicinity,
      meeting_address_lat: selectedMarker.geometry.location.lat,
      meeting_address_lng: selectedMarker.geometry.location.lng,
    };
    setMeetAddress(meetLocation);
  }

  if (loadError) return <div>Error Loading map!</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      onLoad={(map) => setMap(map)}
      zoom={13}
      center={center}
      mapContainerStyle={{ width: width, height: height }}
      options={options}
    >
      {origin ? <Marker position={origin} /> : null}
      {midPoint ? (
        <Marker
          position={midPoint}
          icon={"https://img.icons8.com/fluency/48/null/centre-point.png"}
        />
      ) : null}
      {showMarkers}
      {selectedMarker ? (
        <InfoWindow
          position={{
            lat: selectedMarker.geometry.location.lat,
            lng: selectedMarker.geometry.location.lng,
          }}
          onCloseClick={() => setSelectedMarker(null)}
          onUnmount={() => setSelectedMarker(null)}
        >
          <div>
            <p>{selectedMarker.name}</p>
            <p>{selectedMarker.vicinity}</p>
            {selectedMarker.opening_hours ? (
              selectedMarker.opening_hours.open_now ? (
                <p>Currently Open.</p>
              ) : (
                <p>Closed</p>
              )
            ) : null}
            {distance ? <p>Distance: {distance}</p> : null}
            {duration ? <p>Time needed: {duration}</p> : null}
            <button className="text-blue-600 underline" onClick={pickLocation}>
              Select Location
            </button>
          </div>
        </InfoWindow>
      ) : null}
      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}
    </GoogleMap>
  );
}

export default GMap;
