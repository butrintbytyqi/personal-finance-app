import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Account } from '../../types';
import { useFormatting } from '../../hooks/useFormatting';

export interface AccountOverviewProps {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
}

const AccountOverview: React.FC<AccountOverviewProps> = ({ accounts, onEdit, onDelete }) => {
  const { formatCurrency } = useFormatting();

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Accounts Overview
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {formatCurrency(totalBalance)}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Total Balance
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {accounts.map((account) => (
            <Grid item xs={12} sm={6} md={4} key={account.id}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {account.name}
                    </Typography>
                    <Box>
                      <IconButton size="small" onClick={() => onEdit(account)}>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => onDelete(account.id)} color="error">
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Chip
                      label={account.type}
                      size="small"
                      color={account.type === 'savings' ? 'success' : 'primary'}
                    />
                    <Typography variant="h6" color="primary">
                      {formatCurrency(account.balance)}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="textSecondary">
                    Account #{account.accountNumber}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AccountOverview;
