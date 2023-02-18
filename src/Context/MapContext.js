import { useJsApiLoader } from "@react-google-maps/api";
import { createContext, useState } from "react";

export const MapContext = createContext();

function MapContextProvider({ children }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });

  return (
    <MapContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </MapContext.Provider>
  );
}

export default MapContextProvider;
