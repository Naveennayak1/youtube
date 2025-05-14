import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const UploadVideo = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
console.log(user.channelId)
    if (!user || !user.channelId) {

      setError("You must have a channel to upload videos.");
      return;
    }

    try {
      const videoData = {
        title,
        thumbnailUrl,
        videoUrl,
        description,
        category,
        channelId: user.channelId,
        uploader: user.userId,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.post("http://localhost:5000/api/videos", videoData, config);
      navigate(`/channel/${user.channelId}`); // Redirect back to channel page
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload video");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={3} align="center">
          Upload New Video
        </Typography>
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Thumbnail URL"
            fullWidth
            required
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Video URL"
            fullWidth
            required
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Category"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Upload Video
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default UploadVideo;
