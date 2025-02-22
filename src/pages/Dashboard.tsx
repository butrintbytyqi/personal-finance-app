import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccountBalance as AccountBalanceIcon,
  PieChart as PieChartIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useAppSelector } from '../hooks/redux';

const Dashboard = () => {
  const theme = useTheme();
  const transactions = useAppSelector((state) => state.finances.transactions);
  const accounts = useAppSelector((state) => state.finances.accounts);
  const budgets = useAppSelector((state) => state.finances.budgets);

  // Calculate total income and expenses
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  // Prepare data for charts
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const cashFlowData = last7Days.map((date) => {
    const dayIncome = transactions
      .filter((t) => t.type === 'income' && t.date === date)
      .reduce((sum, t) => sum + t.amount, 0);
    const dayExpenses = transactions
      .filter((t) => t.type === 'expense' && t.date === date)
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      date,
      income: dayIncome,
      expenses: dayExpenses,
    };
  });

  const budgetData = budgets.map((budget) => ({
    name: budget.category,
    spent: budget.spent,
    limit: budget.limit,
  }));

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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Income
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 1, mb: 1 }} color="success.main">
                    ${totalIncome.toLocaleString()}
                  </Typography>
                </Box>
                <IconButton size="small" sx={{ bgcolor: 'success.light', color: 'success.main' }}>
                  <TrendingUpIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Expenses
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 1, mb: 1 }} color="error.main">
                    ${totalExpenses.toLocaleString()}
                  </Typography>
                </Box>
                <IconButton size="small" sx={{ bgcolor: 'error.light', color: 'error.main' }}>
                  <TrendingDownIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Net Worth
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ mt: 1, mb: 1 }} 
                    color={totalBalance >= 0 ? 'primary.main' : 'error.main'}
                  >
                    ${totalBalance.toLocaleString()}
                  </Typography>
                </Box>
                <IconButton size="small" sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                  <AccountBalanceIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Budget Status
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 1, mb: 1 }} color="warning.main">
                    {budgets.length} Active
                  </Typography>
                </Box>
                <IconButton size="small" sx={{ bgcolor: 'warning.light', color: 'warning.main' }}>
                  <PieChartIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cash Flow
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke={theme.palette.success.main}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke={theme.palette.error.main}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Budget Overview
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Bar dataKey="spent" fill={theme.palette.primary.main} />
                    <Bar dataKey="limit" fill={theme.palette.grey[300]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
