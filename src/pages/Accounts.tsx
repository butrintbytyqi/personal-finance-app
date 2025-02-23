import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  addAccount,
  updateAccount,
  deleteAccount,
} from '../features/financesSlice';
import AccountOverview from '../components/accounts/AccountOverview';
import AccountForm from '../components/accounts/AccountForm';
import { Account } from '../types';

const Accounts = () => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.finances.accounts);
  const [openForm, setOpenForm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();

  const handleOpenForm = () => {
    setSelectedAccount(undefined);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedAccount(undefined);
  };

  const handleAddAccount = (newAccount: Omit<Account, 'id'>) => {
    dispatch(addAccount(newAccount));
    setOpenForm(false);
  };

  const handleEditAccount = (updatedAccount: Omit<Account, 'id'>) => {
    if (selectedAccount) {
      dispatch(updateAccount({
        id: selectedAccount.id,
        changes: updatedAccount
      }));
    }
    setOpenForm(false);
  };

  const handleUpdateAccount = (updatedAccount: Partial<Account>) => {
    if (selectedAccount) {
      dispatch(updateAccount({
        id: selectedAccount.id,
        changes: updatedAccount,
      }));
    }
    setOpenForm(false);
    setSelectedAccount(undefined);
  };

  const handleDeleteAccount = (accountId: string) => {
    dispatch(deleteAccount(accountId));
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Accounts
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenForm}
        >
          Add Account
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AccountOverview
            accounts={accounts}
            onEdit={handleEditAccount}
            onDelete={handleDeleteAccount}
          />
        </Grid>
      </Grid>

      <AccountForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={selectedAccount ? handleUpdateAccount : handleAddAccount}
        initialValues={selectedAccount}
      />
    </Box>
  );
};

export default Accounts;
