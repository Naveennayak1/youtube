import React from "react";
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user, setUser, onHamburgerClick, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#202020" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onHamburgerClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component={Link} to="/" sx={{ color: "white", textDecoration: "none", flexGrow: 1 }}>
          YouTube
        </Typography>
        <InputBase
          placeholder="Search…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={{
            bgcolor: "#121212",
            color: "white",
            px: 2,
            borderRadius: 1,
            width: 300,
            mr: 2,
          }}
        />
        {!user ? (
          <>
            <Button color="inherit" component={Link} to="/login">Sign In</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        ) : (
          <>
            <Typography sx={{ mr: 2 }}>Hello, {user.username}</Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
