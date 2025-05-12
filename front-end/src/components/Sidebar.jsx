import React from 'react';

const Sidebar = ({ isOpen }) => {
  return (
    <aside style={{
      width: 250,
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: isOpen ? 0 : -250,
      backgroundColor: '#f9f9f9',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      transition: 'left 0.3s',
      padding: '20px',
      boxSizing: 'border-box',
      zIndex: 999,
    }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><a href="/">Home</a></li>
          <li><a href="/">Trending</a></li>
          <li><a href="/">Subscriptions</a></li>
          <li><a href="/">Library</a></li>
          {/* Add more sidebar items */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
