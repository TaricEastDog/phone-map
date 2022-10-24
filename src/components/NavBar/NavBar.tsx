import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

const NavBar = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        m: 0,
        padding: "5px",
        width: "100%"
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "500" }}>
        PHONE MAP
      </Typography>
    </Container>
  )
}

export default NavBar
