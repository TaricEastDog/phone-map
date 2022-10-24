import { useJsApiLoader } from "@react-google-maps/api"
import PhoneMap from "./Map/PhoneMap"

const MapLoader = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string
  })

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? <PhoneMap /> : <div>"loading..."</div>
}

export default MapLoader
