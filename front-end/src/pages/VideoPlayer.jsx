import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button, TextField } from "@mui/material";
import CommentSection from "../components/CommentSection.jsx";

const VideoPlayer = ({ user }) => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVideo = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
      setVideo(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:5000/api/videos/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setVideo(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    try {
      await axios.post(`http://localhost:5000/api/videos/${id}/dislike`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setVideo(prev => ({ ...prev, dislikes: (prev.dislikes || 0) + 1 }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!video) return <Typography>Video not found</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <video width="100%" height="480" controls>
        <source src={video.videoUrl || "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Typography variant="h5" mt={2}>{video.title}</Typography>
      <Typography variant="subtitle1" color="text.secondary">{video.channelId?.channelName}</Typography>
      <Typography mt={1}>{video.description}</Typography>
      <Box mt={2}>
        <Button variant="contained" color="error" onClick={handleLike} sx={{ mr: 2 }}>
          👍 {video.likes || 0}
        </Button>
        <Button variant="contained" color="error" onClick={handleDislike}>
          👎 {video.dislikes || 0}
        </Button>
      </Box>
      <CommentSection videoId={id} user={user} />
    </Box>
  );
};

export default VideoPlayer;
