// src/pages/CreateChannel.jsx
import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const CreateChannel = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState("");
  const [error, setError] = useState("");

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/channels",
        { channelName, description, channelBanner },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update user state with new channel info
      setUser((prev) => ({
        ...prev,
        hasChannel: true,
        channelId: res.data._id,
      }));

      navigate(`/channel/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create channel");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={3}>
          Create Your Channel
        </Typography>
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Channel Banner URL"
            value={channelBanner}
            onChange={(e) => setChannelBanner(e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Channel
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateChannel;
