import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => (
  <Card sx={{ width: 320, m: 1 }}>
    <Link to={`/video/${video._id || video.videoId}`}>
      <CardMedia
        component="img"
        height="180"
        image={video.thumbnailUrl}
        alt={video.title}
      />
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">{video.title}</Typography>
        <Typography variant="body2" color="text.secondary">{video.channelName || video.channelId?.channelName}</Typography>
        <Typography variant="body2" color="text.secondary">{(video.views || 0).toLocaleString()} views</Typography>
      </CardContent>
    </Link>
  </Card>
);
export default VideoCard;
