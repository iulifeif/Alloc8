import { Box } from "@mui/material";

const Notifications = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        bgcolor: "lightyellow", // Just for visual distinction
      }}
    >
      <div>Notifications</div>
    </Box>
  );
};

export default Notifications;
