import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Temporary mock data - will be replaced with Redux state
const mockData = {
  balance: 12500,
  income: 4500,
  expenses: 2300,
  savings: 2200,
  monthlySpending: [
    { name: 'Jan', amount: 2100 },
    { name: 'Feb', amount: 2300 },
    { name: 'Mar', amount: 1900 },
    { name: 'Apr', amount: 2800 },
    { name: 'May', amount: 2300 },
    { name: 'Jun', amount: 2500 },
  ],
};

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Balance
              </Typography>
              <Typography variant="h4" component="div" color="primary">
                ${mockData.balance.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Monthly Income
              </Typography>
              <Typography variant="h4" component="div" style={{ color: '#34C759' }}>
                ${mockData.income.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Monthly Expenses
              </Typography>
              <Typography variant="h4" component="div" style={{ color: '#FF3B30' }}>
                ${mockData.expenses.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Monthly Savings
              </Typography>
              <Typography variant="h4" component="div" style={{ color: '#5856D6' }}>
                ${mockData.savings.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Spending Chart */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Spending Overview
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData.monthlySpending}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#007AFF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Budget Progress */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Budget Overview
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Monthly Spending
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={70} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: '#E5E5EA',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#007AFF',
                    }
                  }} 
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    $2,300 / $3,000
                  </Typography>
                  <Typography variant="body2" color="primary">
                    70%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
