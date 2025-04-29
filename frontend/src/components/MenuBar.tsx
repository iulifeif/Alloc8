import { useState } from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import { darkGreen, lightGreen } from "./utils";
// import { lightBlue } from "@mui/material/colors";

const data = [
  { name: "Home", path: "/home", icon: HomeIcon },
  { name: "Skills", path: "/home/skills", icon: BuildIcon },
  { name: "Goals", path: "/home/goals", icon: AdsClickIcon },
  { name: "Open roles", path: "/home/openroles", icon: GroupAddIcon },
];

const MenuBar = () => {
  const [navs] = useState(data);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Title */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 2, // Add spacing below the title block
        }}
      >
        <h3 style={{ margin: 0, color: "grey" }}>Alloc8</h3>
        <h5 style={{ margin: 0, color: "grey" }}>by iholban</h5>
      </Box>

      {/* Menu Icons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 2,
          marginTop: 2,
        }}
      >
        <ListItemButton component={NavLink} to={"/home/personaldetails"}>
          <PersonIcon />
        </ListItemButton>

        <ListItemButton component={NavLink} to={"/home/settings"}>
          <SettingsIcon />
        </ListItemButton>

        <ListItemButton component={NavLink} to={"/home/notifications"}>
          <NotificationsIcon />
        </ListItemButton>
      </Box>

      {/* Content of Menu Icons */}
      <Box>
        <Box sx={{ width: "100%", maxWidth: 360 }}>
          {navs.map((nav, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component={NavLink} to={nav.path}>
                <ListItemIcon>
                  <nav.icon />
                </ListItemIcon>
                <ListItemText primary={nav.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MenuBar;
