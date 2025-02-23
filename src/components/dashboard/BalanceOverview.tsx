import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useFormatting } from '../../hooks/useFormatting';

interface BalanceOverviewProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

const BalanceOverview: React.FC<BalanceOverviewProps> = ({
  totalBalance,
  totalIncome,
  totalExpenses,
}) => {
  const { formatCurrency } = useFormatting();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Balance Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Total Balance
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {formatCurrency(totalBalance)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="success.main">
              Total Income
            </Typography>
            <Typography variant="h5" color="success.main">
              {formatCurrency(totalIncome)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="error.main">
              Total Expenses
            </Typography>
            <Typography variant="h5" color="error.main">
              {formatCurrency(totalExpenses)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BalanceOverview;
