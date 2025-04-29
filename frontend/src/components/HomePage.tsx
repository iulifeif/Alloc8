// import { Box } from "@mui/material";
// import { lightGreen } from "./utils";
// import MenuBar from "./MenuBar";

// const HomePage = () => {
//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           width: "100vw",
//           height: "100vh",
//         }}
//       >
//         {/* This is the left menu  */}
//         <Box
//           sx={{
//             backgroundColor: lightGreen,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-around",
//             alignItems: "center",
//           }}
//         >
//           <MenuBar />
//         </Box>
//         {/* This is the content page */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           <div>Asta ar trebui sa fie continutul</div>
//           <div>Asta ar trebui sa fie continutul</div>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default HomePage;
// HomePage.jsx
import { Box } from "@mui/material";
import { lightGreen } from "./utils";
import MenuBar from "./MenuBar";
import { Outlet } from "react-router-dom";

const HomePageContent = () => {
  return (
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
      <div>This is the Home Page Content</div>
      <div>Welcome!</div>
    </Box>
  );
};

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Left Menu */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start", // Align MenuBar to the top
          alignItems: "center",
          paddingTop: 5,
          margin: 2, // Add some top padding
          width: "auto", // Adjust width as needed
        }}
      >
        <MenuBar />
      </Box>
      {/* Content Page
      <HomePageContent /> */}
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
        <Outlet /> {/* Content of the matched route will render here */}
      </Box>
    </Box>
  );
};

export default HomePage;
