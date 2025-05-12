import React from "react";
import { Box, Button } from "@mui/material";
const FilterButtons = ({ categories, selectedCategory, onSelectCategory }) => (
  <Box sx={{ my: 2 }}>
    {categories.map(category => (
      <Button
        key={category}
        variant={selectedCategory === category ? "contained" : "outlined"}
        color="error"
        sx={{ mr: 1, mb: 1 }}
        onClick={() => onSelectCategory(category)}
      >
        {category}
      </Button>
    ))}
  </Box>
);
export default FilterButtons;
