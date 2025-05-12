import React from 'react';
import VideoCard from './VideoCard';

const VideoGrid = ({ videos }) => {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    }}>
      {videos.map(video => (
        <VideoCard key={video.videoId} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
