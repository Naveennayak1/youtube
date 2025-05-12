import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button, TextField, Grid } from "@mui/material";
import VideoCard from "../components/VideoCard.jsx";

const Channel = ({ user }) => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    category: "General",
  });
  const [editingVideoId, setEditingVideoId] = useState(null);

  const fetchChannel = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/channels/${id}`);
      setChannel(res.data);
      setVideos(res.data.videos || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchChannel();
  }, [id]);

  const handleInputChange = e => {
    setNewVideo({ ...newVideo, [e.target.name]: e.target.value });
  };

  const handleCreateVideo = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/videos", {
        ...newVideo,
        channelId: id,
        uploader: user.userId,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setVideos([...videos, res.data]);
      setNewVideo({ title: "", description: "", thumbnailUrl: "", videoUrl: "", category: "General" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${videoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setVideos(videos.filter(v => v._id !== videoId));
    } catch (err) {
      console.error(err);
    }
  };

  if (!channel) return <Typography>Loading channel...</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">{channel.channelName}</Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={3}>{channel.description}</Typography>

      {user && user.userId === channel.owner && (
        <Box mb={4}>
          <Typography variant="h6" mb={2}>Add New Video</Typography>
          <TextField label="Title" name="title" value={newVideo.title} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Description" name="description" value={newVideo.description} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} multiline rows={3} />
          <TextField label="Thumbnail URL" name="thumbnailUrl" value={newVideo.thumbnailUrl} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Video URL" name="videoUrl" value={newVideo.videoUrl} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Category" name="category" value={newVideo.category} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
          <Button variant="contained" color="error" onClick={handleCreateVideo}>Add Video</Button>
        </Box>
      )}

      <Grid container spacing={2}>
        {videos.map(video => (
          <Grid item key={video._id} xs={12} sm={6} md={4}>
            <VideoCard video={video} />
            {user && user.userId === channel.owner && (
              <Button color="error" onClick={() => handleDeleteVideo(video._id)} sx={{ mt: 1 }}>
                Delete Video
              </Button>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Channel;
