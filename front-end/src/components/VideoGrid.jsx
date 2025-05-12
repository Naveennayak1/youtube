import React from "react";
import { Box } from "@mui/material";
import VideoCard from "./VideoCard.jsx";

const VideoGrid = ({ videos }) => (
  <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
    {videos.map(video => (
      <VideoCard key={video._id || video.videoId} video={video} />
    ))}
  </Box>
);
export default VideoGrid;
