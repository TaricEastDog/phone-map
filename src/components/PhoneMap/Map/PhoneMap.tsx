import { useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Container from "@mui/material/Container"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Slider from "@mui/material/Slider"
import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api"

import { usePhoneDataQuery } from "../../../hooks/usePhoneDataQuery"
import { center, containerStyle } from "./PhoneMap.consts"
import ErrorMessage from "./ErrorMessage"
import blueMarker from "../../../utils/blue-marker.png"
import redMarker from "../../../utils/red-marker.png"

export interface PhoneFilters {
  status: boolean
  minSpeed: number
  maxSpeed: number
}

const PhoneMap = (): JSX.Element => {
  const [filters, setFilters] = useState<PhoneFilters>({
    status: true,
    minSpeed: 0,
    maxSpeed: 100
  })
  const [speedValue, setSpeedValue] = useState<number[]>([0, 100])
  const { data, error, isError, isLoading } = usePhoneDataQuery(filters)

  if (isError) {
    return <ErrorMessage error={error} />
  }

  if (isLoading) {
    return <CircularProgress />
  }

  console.log(data)

  const handleShowOfflineChange = () => {
    setFilters((filters) => ({ ...filters, status: !filters.status }))
  }

  const handleSpeedChange = (e: any, newValue: number | number[]) => {
    const newSpeedValue = newValue as number[]
    setSpeedValue(newValue as number[])

    setFilters((filters) => ({
      ...filters,
      minSpeed: newSpeedValue[0],
      maxSpeed: newSpeedValue[1]
    }))
  }

  return (
    <Container
      fixed
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 0,
        p: 0,
        width: "100%"
      }}
    >
      <div>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              onChange={() => handleShowOfflineChange()}
            />
          }
          label="Offline Devices"
        />
      </div>
      <Slider
        value={speedValue}
        onChange={handleSpeedChange}
        valueLabelDisplay="auto"
        disableSwap
      />
      <GoogleMap zoom={7} center={center} mapContainerStyle={containerStyle}>
        <MarkerClusterer minimumClusterSize={2} averageCenter>
          {(clusterer) => (
            <>
              {data.map((phone) => (
                <Marker
                  key={phone.id}
                  clusterer={clusterer}
                  position={{
                    lat: parseFloat(phone.last_latitude),
                    lng: parseFloat(phone.last_longitude)
                  }}
                  title="adasdaasd"
                  icon={
                    phone.last_status === "No Alarm"
                      ? { url: blueMarker }
                      : { url: redMarker }
                  }
                />
              ))}
            </>
          )}
        </MarkerClusterer>
      </GoogleMap>
    </Container>
  )
}

export default PhoneMap
