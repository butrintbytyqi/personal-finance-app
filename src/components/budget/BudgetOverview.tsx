import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Budget } from '../../types';

interface BudgetOverviewProps {
  budgets: Budget[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ budgets }) => {
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  const pieData = budgets.map((budget) => ({
    name: budget.category.charAt(0).toUpperCase() + budget.category.slice(1),
    value: budget.spent,
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Budget Overview
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Budget
              </Typography>
              <Typography variant="h4" color="primary">
                ${totalBudget.toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Spent
              </Typography>
              <Typography variant="h4" color={totalSpent > totalBudget ? 'error.main' : 'success.main'}>
                ${totalSpent.toLocaleString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Remaining
              </Typography>
              <Typography 
                variant="h4" 
                color={remainingBudget < 0 ? 'error.main' : 'success.main'}
              >
                ${Math.abs(remainingBudget).toLocaleString()}
                <Typography component="span" variant="body2" color="text.secondary">
                  {remainingBudget < 0 ? ' over budget' : ' remaining'}
                </Typography>
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={(entry) => `${entry.name}: $${entry.value.toLocaleString()}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview;
