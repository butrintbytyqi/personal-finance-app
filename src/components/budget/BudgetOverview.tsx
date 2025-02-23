import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Grid,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Budget } from '../../types';
import { useFormatting } from '../../hooks/useFormatting';

export interface BudgetOverviewProps {
  budgets: Budget[];
  onEdit: (budget: Budget) => void;
  onDelete: (budgetId: string) => void;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ budgets, onEdit, onDelete }) => {
  const { formatCurrency } = useFormatting();

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Budget Overview
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle2" color="textSecondary">
                Total Budget
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(totalBudget)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle2" color="textSecondary">
                Total Spent
              </Typography>
              <Typography variant="h5" color={totalSpent > totalBudget ? 'error' : 'success'}>
                {formatCurrency(totalSpent)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle2" color="textSecondary">
                Remaining
              </Typography>
              <Typography variant="h5" color={totalBudget - totalSpent < 0 ? 'error' : 'success'}>
                {formatCurrency(totalBudget - totalSpent)}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={2}>
          {budgets.map((budget) => {
            const progress = (budget.spent / budget.limit) * 100;
            const isOverBudget = progress > 100;

            return (
              <Grid item xs={12} key={budget.id}>
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {budget.category}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {budget.period}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton size="small" onClick={() => onEdit(budget)}>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => onDelete(budget.id)} color="error">
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">
                      {formatCurrency(budget.spent)} of {formatCurrency(budget.limit)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={isOverBudget ? 'error' : 'success'}
                    >
                      {progress.toFixed(1)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(progress, 100)}
                    color={isOverBudget ? 'error' : 'primary'}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  {isOverBudget && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, display: 'block' }}
                    >
                      Over budget by {formatCurrency(budget.spent - budget.limit)}
                    </Typography>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview;
