import Container from "@mui/material/Container"
import NavBar from "./components/NavBar"
import MapLoader from "./components/PhoneMap"

const App = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px"
      }}
    >
      <NavBar />
      <MapLoader />
    </Container>
  )
}

export default App
