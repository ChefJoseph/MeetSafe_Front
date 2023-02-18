
import { useEffect, useState } from "react";
export function useCurrentLocation() {
    const [lat, setLat] = useState(null)
    const [lng,setLng] = useState(null)

    useEffect(()=> {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=> {
              const {latitude, longitude} = position.coords
              setLat(latitude)
              setLng(longitude)
          });
        } else {
          console.log("loc not enabled")
          setLat(false)
          setLng(false)
        }
      },[])

    return [lat,lng]
}