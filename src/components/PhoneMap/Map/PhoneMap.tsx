import { useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Container from "@mui/material/Container"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Slider from "@mui/material/Slider"
import Typography from "@mui/material/Typography"
import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api"

import { resData, usePhoneDataQuery } from "../../../hooks/usePhoneDataQuery"
import { center, containerStyle, sliderMarks } from "./PhoneMap.consts"
import ErrorMessage from "./ErrorMessage"
import PhoneModal from "../../PhoneModal"
import blueMarker from "../../../utils/blue-marker.png"
import redMarker from "../../../utils/red-marker.png"

export interface PhoneFilters {
  status: boolean
  minSpeed: number
  maxSpeed: number
}

const PhoneMap = () => {
  const [selectedPhoneData, setSelectedPhoneData] = useState<resData>()
  const [showModal, setShowModal] = useState(false)
  const [filters, setFilters] = useState<PhoneFilters>({
    status: true,
    minSpeed: 0,
    maxSpeed: 50
  })
  const [speedValue, setSpeedValue] = useState<number[]>([0, 50])
  const { data, error, isError, isLoading } = usePhoneDataQuery(filters)

  if (isError) {
    return <ErrorMessage error={error} />
  }

  if (isLoading) {
    return <CircularProgress />
  }

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

  const handleMarkerClicked = (phone: resData) => {
    setSelectedPhoneData(phone)
    setShowModal(true)
  }

  return (
    <Container
      fixed
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 0,
        p: 0,
        width: "100%",
        gap: "8px"
      }}
    >
      <PhoneModal
        open={showModal}
        onClose={() => setShowModal(!showModal)}
        phoneData={selectedPhoneData}
      />
      <Typography variant="h5">Filters:</Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "36px",
          m: 0,
          p: 0
        }}
      >
        <FormControlLabel
          sx={{ whiteSpace: "nowrap" }}
          control={
            <Checkbox
              defaultChecked
              onChange={() => handleShowOfflineChange()}
            />
          }
          label="Offline Devices"
        />

        <Slider
          value={speedValue}
          onChange={handleSpeedChange}
          valueLabelDisplay="auto"
          marks={sliderMarks}
          disableSwap
          max={60}
        />
      </Container>

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
                  title={phone.last_status}
                  icon={
                    phone.last_status === "No Alarm"
                      ? { url: blueMarker }
                      : { url: redMarker }
                  }
                  onClick={() => handleMarkerClicked(phone)}
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
