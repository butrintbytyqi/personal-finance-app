import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Budget } from '../../types';

interface BudgetFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (budget: Partial<Budget>) => void;
  budget?: Budget;
}

const categories = [
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

const BudgetForm: React.FC<BudgetFormProps> = ({
  open,
  onClose,
  onSubmit,
  budget,
}) => {
  const [formData, setFormData] = React.useState<Partial<Budget>>({
    category: '',
    limit: 0,
    spent: 0,
    period: 'monthly',
    ...budget,
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'limit' || name === 'spent' 
        ? Number(event.target.value) 
        : event.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {budget ? 'Edit Budget' : 'Add Budget'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Category"
                value={formData.category}
                onChange={handleChange('category')}
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category.toLowerCase()}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Budget Limit"
                type="number"
                value={formData.limit}
                onChange={handleChange('limit')}
                required
                InputProps={{
                  startAdornment: '$',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Period"
                value={formData.period}
                onChange={handleChange('period')}
                required
              >
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </TextField>
            </Grid>
            {budget && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amount Spent"
                  type="number"
                  value={formData.spent}
                  onChange={handleChange('spent')}
                  InputProps={{
                    startAdornment: '$',
                  }}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {budget ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BudgetForm;
