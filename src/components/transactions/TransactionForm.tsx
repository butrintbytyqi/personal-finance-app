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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Transaction } from '../../types';

interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (transaction: Partial<Transaction>) => void;
  transaction?: Transaction;
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

const TransactionForm: React.FC<TransactionFormProps> = ({
  open,
  onClose,
  onSubmit,
  transaction,
}) => {
  const [formData, setFormData] = React.useState<Partial<Transaction>>({
    date: new Date().toISOString(),
    amount: 0,
    category: '',
    description: '',
    type: 'expense',
    ...transaction,
  });

  const handleChange = (name: string) => (event: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        date: date.toISOString(),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {transaction ? 'Edit Transaction' : 'Add Transaction'}
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DatePicker
                  label="Date"
                  value={formData.date ? new Date(formData.date) : null}
                  onChange={handleDateChange}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={handleChange('description')}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange('amount')}
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
                  label="Type"
                  value={formData.type}
                  onChange={handleChange('type')}
                  required
                >
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </TextField>
              </Grid>
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
            </Grid>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {transaction ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TransactionForm;
