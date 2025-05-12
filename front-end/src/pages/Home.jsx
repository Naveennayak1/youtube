import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import FilterButtons from '../components/FilterButtons';
import VideoGrid from '../components/VideoGrid';

const categories = ['All', 'Education', 'Music', 'Gaming', 'News'];

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory;

      const res = await axios.get('http://localhost:5000/api/videos', { params });
      setVideos(res.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
    setLoading(false);
  };

  // Fetch videos when component mounts and when search/filter changes
  useEffect(() => {
    fetchVideos();
  }, [searchTerm, selectedCategory]);

  return (
    <div>
      <Header
        onHamburgerClick={() => setSidebarOpen(!sidebarOpen)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Sidebar isOpen={sidebarOpen} />
      <main style={{ marginLeft: sidebarOpen ? 250 : 0, padding: '20px', transition: 'margin-left 0.3s' }}>
        <FilterButtons
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        {loading ? <p>Loading videos...</p> : <VideoGrid videos={videos} />}
      </main>
    </div>
  );
};

export default Home;
