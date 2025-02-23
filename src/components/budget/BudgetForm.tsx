import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import { Budget } from '../../types';
import { useFormatting } from '../../hooks/useFormatting';

interface BudgetFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (budget: Omit<Budget, 'id'>) => void;
  initialValues?: Budget;
}

const categories = [
  'Food & Dining',
  'Shopping',
  'Transportation',
  'Bills & Utilities',
  'Entertainment',
  'Health & Fitness',
  'Travel',
  'Other',
] as const;

const periods = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
] as const;

const BudgetForm: React.FC<BudgetFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialValues,
}) => {
  const { currency } = useFormatting();
  const [formData, setFormData] = React.useState<Omit<Budget, 'id'>>({
    category: categories[0],
    limit: 0,
    spent: 0,
    period: 'monthly',
    ...initialValues,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['limit', 'spent'].includes(name) ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {initialValues ? 'Edit Budget' : 'Add Budget'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="category"
                label="Category"
                select
                fullWidth
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="limit"
                label={`Budget Limit (${currency})`}
                type="number"
                fullWidth
                value={formData.limit}
                onChange={handleChange}
                required
                inputProps={{ step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="spent"
                label={`Amount Spent (${currency})`}
                type="number"
                fullWidth
                value={formData.spent}
                onChange={handleChange}
                required
                inputProps={{ step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="period"
                label="Budget Period"
                select
                fullWidth
                value={formData.period}
                onChange={handleChange}
                required
              >
                {periods.map((period) => (
                  <MenuItem key={period.value} value={period.value}>
                    {period.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialValues ? 'Save Changes' : 'Add Budget'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BudgetForm;
