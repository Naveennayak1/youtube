// src/components/Sidebar.jsx
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";

import { Link, useLocation } from "react-router-dom";

const drawerWidthOpen = 240;
const drawerWidthClosed = 60;

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Library", icon: <VideoLibraryIcon />, path: "/library" },
    // Add more menu items as needed
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidthOpen : drawerWidthClosed,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidthOpen : drawerWidthClosed,
          boxSizing: "border-box",
          bgcolor: "#202020",
          color: "white",
        },
      }}
    >
      <List>
        <ListItem disablePadding sx={{ justifyContent: open ? "initial" : "center" }}>
          <ListItemButton onClick={() => setOpen(!open)} sx={{ minHeight: 48 }}>
            {open ? <MenuOpenIcon /> : <MenuIcon />}
            {open && <ListItemText primary="Menu" sx={{ ml: 2 }} />}
          </ListItemButton>
        </ListItem>
        <Divider sx={{ bgcolor: "gray" }} />
        {menuItems.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <Tooltip title={!open ? text : ""} placement="right">
              <ListItemButton
                component={Link}
                to={path}
                selected={location.pathname === path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                  {icon}
                </ListItemIcon>
                {open && <ListItemText primary={text} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
