// src/pages/VideoPlayer.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  Button,
  Paper,
} from "@mui/material";
import { UserContext } from "../context/UserContext";
import CommentsSection from "../components/CommentSection";

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load video");
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  if (loading) return <CircularProgress />;

  if (!video) return <Typography>Video not found</Typography>;

  return (
    <Box sx={{  mx: "auto" }}>
      <Box sx={{ position: "relative", pb: "56.25%", height: 0, mb: 2 }}>
        <video
          src={video.videoUrl}
          controls
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        />
      </Box>

      <Typography variant="h5" gutterBottom>
        {video.title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {video.views} views • {new Date(video.uploadDate).toLocaleDateString()}
      </Typography>

      <Paper
        elevation={2}
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          mb: 3,
          borderRadius: 2,
          bgcolor: "#f9f9f9",
        }}
      >
        <Avatar
          src={video.channelId?.channelBanner || ""}
          alt={video.channelId?.channelName || "Channel"}
          sx={{ width: 56, height: 56, mr: 2 }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            <Link to={`/channel/${video.channelId?._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              {video.channelId?.channelName}
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video.channelId?.description}
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="small"
          onClick={() => alert("Subscribe feature coming soon!")}
        >
          Subscribe
        </Button>
      </Paper>

      <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
        {video.description}
      </Typography>
      <CommentsSection videoId={video._id} />
    </Box>
    
  );
};

export default VideoPlayer;
