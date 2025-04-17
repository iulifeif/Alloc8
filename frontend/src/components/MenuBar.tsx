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
import MenuIcon from "@mui/icons-material/Menu";

const data = [
  { name: "Home", path: "/home", icon: HomeIcon },
  { name: "Skills", path: "/skills", icon: BuildIcon },
  { name: "Goals", path: "/goals", icon: AdsClickIcon },
  { name: "Open roles", path: "/openroles", icon: GroupAddIcon },
];

const MenuBar = () => {
  const [navs] = useState(data);
  return (
    // <MenuBarContainer onMouseEnter={handleMouseHover} onMouseLeave={handleMouseLeave}>
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
  );
};

export default MenuBar;
