// src/components/Sidebar.jsx
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;
const miniDrawerWidth = 72;

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const menuItems = [
    { text: "Home", icon: <HomeIcon /> },
    { text: "Trending", icon: <WhatshotIcon /> },
    { text: "Subscriptions", icon: <SubscriptionsIcon /> },
    { text: "Library", icon: <VideoLibraryIcon /> },
    { text: "History", icon: <HistoryIcon /> },
  ];

  return (
    <>
      {/* Hamburger toggle button */}
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: "fixed",
          top: 16,
          left: isSidebarOpen ? drawerWidth + 16 : miniDrawerWidth + 16,
          zIndex: 1300,
          color: "white",
          bgcolor: "#cc0000",
          "&:hover": { bgcolor: "#b30000" },
          transition: "left 0.3s",
        }}
        aria-label="Toggle sidebar"
        size="large"
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar drawer */}
      <Drawer
        variant="permanent"
        open={isSidebarOpen}
        sx={{
          width: isSidebarOpen ? drawerWidth : miniDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSidebarOpen ? drawerWidth : miniDrawerWidth,
            boxSizing: "border-box",
            bgcolor: "#121212",
            color: "white",
            overflowX: "hidden",
            transition: "width 0.3s",
            borderRight: "none",
          },
        }}
      >
        <List sx={{ mt: 8 }}>
          {menuItems.map(({ text, icon }) => (
            <Tooltip
              key={text}
              title={!isSidebarOpen ? text : ""}
              placement="right"
              arrow
            >
              <ListItem button sx={{ px: 2.5 }}>
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: 0,
                    mr: isSidebarOpen ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </ListItemIcon>
                {isSidebarOpen && <ListItemText primary={text} />}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
