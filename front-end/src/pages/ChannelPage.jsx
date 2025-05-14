import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const formatViews = (num) => {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
};

const ChannelPage = () => {
  const { id } = useParams(); // channel ID from URL
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/channels/${id}`);
        setChannel(res.data);
      } catch (err) {
        console.error("Failed to fetch channel:", err);
        alert("Channel not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchChannel();
  }, [id, navigate]);

  if (loading) return <Typography>Loading channel...</Typography>;
  if (!channel) return <Typography>Channel not found</Typography>;

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, px: 2 }}>
      {/* Channel Banner with Gradient Overlay */}
      {channel.channelBanner ? (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxHeight: 200,
            overflow: "hidden",
            borderRadius: 2,
            mb: 3,
            boxShadow: 3,
          }}
        >
          <Box
            component="img"
            src={channel.channelBanner}
            alt={`${channel.channelName} banner`}
            sx={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0))",
            }}
          />
        </Box>
      ) : (
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            height: 200,
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.300",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No Banner Image
          </Typography>
        </Paper>
      )}

      {/* Channel Info Section */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Avatar
          src={channel.channelIcon || ""}
          alt={channel.channelName}
          sx={{ width: 96, height: 96, mr: 3, border: "3px solid #1976d2" }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" fontWeight="bold">
            {channel.channelName}
          </Typography>
          {channel.subscriberCount !== undefined && (
            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5 }}>
              {channel.subscriberCount.toLocaleString()} subscribers
            </Typography>
          )}
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {channel.description || "No description available."}
          </Typography>
        </Box>

        {/* Upload Video Button (only if current user owns this channel) */}
        {user && user.userId === channel.owner && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/upload-video")}
            sx={{ height: 40 }}
          >
            Upload Video
          </Button>
        )}
      </Box>

      {/* Videos Grid */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Videos
      </Typography>

      {channel.videos && channel.videos.length > 0 ? (
        <Grid container spacing={3}>
          {channel.videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video._id}>
              <Card
                sx={{
                  cursor: "pointer",
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                  },
                }}
                onClick={() => navigate(`/video/${video._id}`)}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={video.thumbnailUrl || "/default-thumbnail.png"}
                  alt={video.title}
                  sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    noWrap
                    title={video.title}
                    sx={{ fontWeight: "bold" }}
                  >
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {formatViews(video.views)} views •{" "}
                    {new Date(video.uploadDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="text.secondary" sx={{ mt: 3 }}>
          No videos uploaded yet.
        </Typography>
      )}
    </Box>
  );
};

export default ChannelPage;
