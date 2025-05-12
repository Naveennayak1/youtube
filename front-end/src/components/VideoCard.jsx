import React from 'react';

const VideoCard = ({ video }) => {
  return (
    <div style={{
      width: '300px',
      margin: '10px',
      cursor: 'pointer',
    }}>
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        style={{ width: '100%', borderRadius: '8px' }}
      />
      <h3>{video.title}</h3>
      <p style={{ margin: '4px 0', color: '#555' }}>{video.channelName}</p>
      <p style={{ margin: 0, color: '#777' }}>{video.views.toLocaleString()} views</p>
    </div>
  );
};

export default VideoCard;
