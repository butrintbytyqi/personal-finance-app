import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Grid,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface TransactionFiltersProps {
  filters: {
    startDate: Date | null;
    endDate: Date | null;
    type: string;
    category: string;
    minAmount: string;
    maxAmount: string;
  };
  onFilterChange: (name: string, value: any) => void;
  onResetFilters: () => void;
}

const categories = [
  'All',
  'Food & Dining',
  'Shopping',
  'Transport',
  'Bills & Utilities',
  'Entertainment',
  'Health',
  'Travel',
  'Education',
  'Other',
];

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="Start Date"
              value={filters.startDate}
              onChange={(date) => onFilterChange('startDate', date)}
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="End Date"
              value={filters.endDate}
              onChange={(date) => onFilterChange('endDate', date)}
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              select
              fullWidth
              size="small"
              label="Type"
              value={filters.type}
              onChange={(e) => onFilterChange('type', e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              select
              fullWidth
              size="small"
              label="Category"
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category.toLowerCase()}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={1}>
            <TextField
              fullWidth
              size="small"
              label="Min $"
              type="number"
              value={filters.minAmount}
              onChange={(e) => onFilterChange('minAmount', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={1}>
            <TextField
              fullWidth
              size="small"
              label="Max $"
              type="number"
              value={filters.maxAmount}
              onChange={(e) => onFilterChange('maxAmount', e.target.value)}
            />
          </Grid>
          <Grid 
            item 
            xs={12} 
            md="auto" 
            sx={{ 
              display: 'flex', 
              gap: 1,
              justifyContent: { xs: 'flex-start', md: 'flex-end' } 
            }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={onResetFilters}
              sx={{ minWidth: 100 }}
            >
              Reset
            </Button>
            <Tooltip title="Apply Filters">
              <IconButton color="primary" size="small">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default TransactionFilters;
