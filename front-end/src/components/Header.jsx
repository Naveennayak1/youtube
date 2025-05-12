import React from 'react';

const Header = ({ onHamburgerClick, searchTerm, setSearchTerm }) => {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#cc0000',
      color: 'white',
      padding: '10px 20px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={onHamburgerClick}
          style={{
            fontSize: '24px',
            marginRight: '20px',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            color: 'white',
          }}
          aria-label="Toggle sidebar"
        >
          &#9776;
        </button>
        <h1 style={{ margin: 0, fontSize: '24px' }}>YouTube Clone</h1>
      </div>
      <input
        type="text"
        placeholder="Search videos..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          padding: '6px 10px',
          borderRadius: '4px',
          border: 'none',
          width: '300px',
          maxWidth: '50vw',
        }}
      />
    </header>
  );
};

export default Header;
