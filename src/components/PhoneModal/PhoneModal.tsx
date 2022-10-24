import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Container from "@mui/material/Container"
import { resData } from "../../hooks/usePhoneDataQuery"

interface ModalProps {
  open: boolean
  onClose?: () => void
  phoneData?: resData
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 6,
  boxShadow: 24,
  p: 4
}

const PhoneModal = ({ open, phoneData, onClose }: ModalProps) => {
  const heartbeatDate =
    phoneData && new Date(parseInt(phoneData.last_heartbeat) * 1000)

  const trackDate = phoneData && new Date(phoneData.last_track_time)

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Container
          sx={{ display: "flex", flexDirection: "column", gap: "4px" }}
        >
          <Typography mt={0} variant="h5" component="h2">
            Tracking: PhoneID - {phoneData?.id.padStart(3, "0")}
          </Typography>
          <Divider />
          <Typography>IMEI: {phoneData?.imei}</Typography>
          <Divider />
          <Typography>SIM number: {phoneData?.sim_number}</Typography>
          <Divider />
          <Typography>Last Status: {phoneData?.last_status}</Typography>
          <Divider />
          <Typography>Last Speed: {phoneData?.last_speed}km/h</Typography>
          <Divider />
          <Typography>
            Last Coordinates:{" "}
            {`${phoneData?.last_latitude}, ${phoneData?.last_longitude}`}
          </Typography>
          <Divider />
          <Typography>
            Last Heartbeat: {heartbeatDate?.toLocaleString("en-US")}
          </Typography>
          <Divider />
          <Typography>
            Last Track Time: {trackDate?.toLocaleString("en-US")}
          </Typography>
          <Divider />
        </Container>
      </Box>
    </Modal>
  )
}

export default PhoneModal
