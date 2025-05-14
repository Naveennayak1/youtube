// src/components/Header.jsx
import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const Header = () => {
 const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    handleMenuClose();
    navigate("/");
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#202020", zIndex: 1300 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "white", textDecoration: "none", flexGrow: 1 }}
        >
          YouTube Clone
        </Typography>

        {!user ? (
          <>
            <Button color="inherit" component={Link} to="/login">
              Sign In
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        ) : (
          <>
            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
              <Avatar alt={user.username} src={user.avatar || ""} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>Hello, {user.username}</MenuItem>

              {user.hasChannel && user.channelId ? (
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate(`/channel/${user.channelId}`);
                  }}
                >
                  Your Channel
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/create-channel");
                  }}
                >
                  Create Channel
                </MenuItem>
              )}

              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
