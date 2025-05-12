import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    try {
      await axios.post("http://localhost:5000/api/auth/signup", { username, email, password, avatar });
      setSuccessMsg("Registration successful! You can now login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" mb={2} align="center">Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        {successMsg && <Typography color="success.main">{successMsg}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField label="Username" fullWidth required value={username} onChange={e => setUsername(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Email" type="email" fullWidth required value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Avatar URL (optional)" fullWidth value={avatar} onChange={e => setAvatar(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Password" type="password" fullWidth required value={password} onChange={e => setPassword(e.target.value)} sx={{ mb: 2 }} />
          <Button type="submit" variant="contained" color="error" fullWidth sx={{ mb: 2 }}>Register</Button>
        </form>
        <Typography align="center">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
};
export default Register;
