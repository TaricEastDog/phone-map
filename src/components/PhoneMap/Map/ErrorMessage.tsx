import Typography from "@mui/material/Typography"

const ErrorMessage = ({ error }: any) => {
  console.log("error error", error.message)
  return (
    <Typography sx={{ color: "red" }} variant="h3">
      Something went wrong: {error.message}
    </Typography>
  )
}

export default ErrorMessage
