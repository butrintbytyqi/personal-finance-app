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
import { Account } from '../../types';
import { useFormatting } from '../../hooks/useFormatting';

interface AccountFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (account: Omit<Account, 'id'>) => void;
  initialValues?: Account;
}

const accountTypes = [
  { value: 'checking', label: 'Checking' },
  { value: 'savings', label: 'Savings' },
  { value: 'credit', label: 'Credit Card' },
  { value: 'investment', label: 'Investment' },
] as const;

const AccountForm: React.FC<AccountFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialValues,
}) => {
  const { currency } = useFormatting();
  const [formData, setFormData] = React.useState<Omit<Account, 'id'>>({
    name: '',
    type: 'checking',
    balance: 0,
    accountNumber: '',
    currency,
    ...initialValues,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'balance' ? parseFloat(value) || 0 : value,
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
          {initialValues ? 'Edit Account' : 'Add Account'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Account Name"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="type"
                label="Account Type"
                select
                fullWidth
                value={formData.type}
                onChange={handleChange}
                required
              >
                {accountTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="balance"
                label={`Balance (${currency})`}
                type="number"
                fullWidth
                value={formData.balance}
                onChange={handleChange}
                required
                inputProps={{ step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="accountNumber"
                label="Account Number"
                fullWidth
                value={formData.accountNumber}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialValues ? 'Save Changes' : 'Add Account'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AccountForm;
