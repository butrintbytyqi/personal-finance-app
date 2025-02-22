import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import AccountCard from '../components/accounts/AccountCard';
import AccountForm from '../components/accounts/AccountForm';
import AccountOverview from '../components/accounts/AccountOverview';
import { Account } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  addAccount,
  updateAccount,
  deleteAccount,
} from '../features/financesSlice';

const Accounts = () => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.finances.accounts);
  const [openForm, setOpenForm] = React.useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState<Account | undefined>(undefined);

  const handleAddAccount = (account: Partial<Account>) => {
    const newAccount = {
      ...account,
      id: Date.now().toString(),
    } as Account;

    dispatch(addAccount(newAccount));
    setOpenForm(false);
  };

  const handleEditAccount = (account: Account) => {
    setSelectedAccount(account);
    setOpenForm(true);
  };

  const handleUpdateAccount = (updatedAccount: Partial<Account>) => {
    if (selectedAccount) {
      dispatch(updateAccount({ ...selectedAccount, ...updatedAccount }));
    }
    setOpenForm(false);
    setSelectedAccount(undefined);
  };

  const handleDeleteAccount = (accountId: string) => {
    dispatch(deleteAccount(accountId));
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedAccount(undefined);
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
          onClick={() => setOpenForm(true)}
        >
          Add Account
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AccountOverview accounts={accounts} />
        </Grid>

        {accounts.map((account) => (
          <Grid item xs={12} sm={6} md={4} key={account.id}>
            <AccountCard
              account={account}
              onEdit={handleEditAccount}
              onDelete={handleDeleteAccount}
            />
          </Grid>
        ))}
      </Grid>

      <AccountForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={selectedAccount ? handleUpdateAccount : handleAddAccount}
        account={selectedAccount}
      />
    </Box>
  );
};

export default Accounts;
