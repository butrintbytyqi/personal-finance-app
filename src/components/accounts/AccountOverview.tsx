import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Account } from '../../types';

interface AccountOverviewProps {
  accounts: Account[];
}

const AccountOverview: React.FC<AccountOverviewProps> = ({ accounts }) => {
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const totalAssets = accounts.reduce((sum, account) => 
    sum + (account.balance > 0 ? account.balance : 0), 0);
  const totalLiabilities = accounts.reduce((sum, account) => 
    sum + (account.balance < 0 ? Math.abs(account.balance) : 0), 0);

  const chartData = accounts.map((account) => ({
    name: account.name,
    balance: account.balance,
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Account Overview
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Net Worth
              </Typography>
              <Typography variant="h4" color={totalBalance >= 0 ? 'primary' : 'error.main'}>
                ${totalBalance.toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Assets
              </Typography>
              <Typography variant="h4" color="success.main">
                ${totalAssets.toLocaleString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Liabilities
              </Typography>
              <Typography variant="h4" color="error.main">
                ${totalLiabilities.toLocaleString()}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                  />
                  <Bar 
                    dataKey="balance" 
                    fill="#2196f3"
                    stroke="#2196f3"
                    fillOpacity={0.8}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.balance >= 0 ? '#2196f3' : '#f44336'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AccountOverview;
