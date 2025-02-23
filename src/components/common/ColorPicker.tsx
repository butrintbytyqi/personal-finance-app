import React from 'react';
import { Box, Button, Popover } from '@mui/material';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const colors = [
  '#2196f3', // Blue
  '#4caf50', // Green
  '#f44336', // Red
  '#ff9800', // Orange
  '#9c27b0', // Purple
  '#795548', // Brown
  '#607d8b', // Blue Grey
  '#009688', // Teal
  '#ffeb3b', // Yellow
  '#673ab7', // Deep Purple
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorSelect = (selectedColor: string) => {
    onChange(selectedColor);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'color-picker-popover' : undefined;

  return (
    <Box>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="outlined"
        style={{
          backgroundColor: color,
          width: '100%',
          height: '40px',
          border: '1px solid rgba(0, 0, 0, 0.23)',
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1 }}>
          {colors.map((c) => (
            <Button
              key={c}
              onClick={() => handleColorSelect(c)}
              sx={{
                width: 40,
                height: 40,
                minWidth: 'auto',
                backgroundColor: c,
                '&:hover': {
                  backgroundColor: c,
                  opacity: 0.8,
                },
                border: c === color ? '2px solid white' : 'none',
                boxShadow: c === color ? '0 0 0 2px #000' : 'none',
              }}
            />
          ))}
        </Box>
      </Popover>
    </Box>
  );
};
