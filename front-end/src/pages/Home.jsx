import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import FilterButtons from "../components/FilterButtons.jsx";
import VideoGrid from "../components/VideoGrid.jsx";
import axios from "axios";
import { Box } from '@mui/material';


const categories = ["All", "Education", "Music", "Gaming", "News"];

const Home = ({ user, setUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory && selectedCategory !== "All") params.category = selectedCategory;
      const res = await axios.get("http://localhost:5000/api/videos", { params });
      setVideos(res.data);
    };
    fetchVideos();
  }, [searchTerm, selectedCategory]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box sx={{ flexGrow: 1 }}>
        {/* <Header user={user} setUser={setUser} onHamburgerClick={() => setSidebarOpen(!sidebarOpen)} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
        <FilterButtons categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        <VideoGrid videos={videos} />
      </Box>
    </Box>
  );
};
export default Home;
