// OpenRolesPage.jsx
import { Box } from "@mui/material";

const OpenRolesPage = () => {
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
      <div>Current Job Openings</div>
      {/* Add your open roles components */}
    </Box>
  );
};

export default OpenRolesPage;
