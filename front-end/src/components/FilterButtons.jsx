import React from 'react';

const FilterButtons = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          style={{
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: selectedCategory === category ? '#cc0000' : '#eee',
            color: selectedCategory === category ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
