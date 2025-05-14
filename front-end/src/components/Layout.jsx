// src/components/Layout.jsx
import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: sidebarOpen ? "240px" : "60px",
            transition: "margin-left 0.3s ease",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
