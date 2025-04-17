import { Box } from "@mui/material";
import { lightGreen } from "./utils";
import MenuBar from "./MenuBar";

const HomePage = () => {
  return (
    <>
      {/* This is the header page */}
      <Box
        sx={{
          backgroundColor: lightGreen,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Hello {localStorage.getItem("username") ?? "Guest"}! This is the main
        page.
      </Box>
      {/* The rest of the page below the header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* This is the left menu  */}
        <Box
          sx={{
            backgroundColor: lightGreen,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <MenuBar />
        </Box>
        {/* This is the content page */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div>Asta ar trebui sa fie continutul</div>
          <div>Asta ar trebui sa fie continutul</div>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
