import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import BudgetCard from '../components/budget/BudgetCard';
import BudgetForm from '../components/budget/BudgetForm';
import BudgetOverview from '../components/budget/BudgetOverview';
import { Budget as BudgetType } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  addBudget,
  updateBudget,
  deleteBudget,
} from '../features/financesSlice';

const Budget = () => {
  const dispatch = useAppDispatch();
  const budgets = useAppSelector((state) => state.finances.budgets);
  const [openForm, setOpenForm] = React.useState(false);
  const [selectedBudget, setSelectedBudget] = React.useState<BudgetType | undefined>(undefined);

  const handleAddBudget = (budget: Partial<BudgetType>) => {
    const newBudget = {
      ...budget,
      id: Date.now().toString(),
      spent: 0,
    } as BudgetType;

    dispatch(addBudget(newBudget));
    setOpenForm(false);
  };

  const handleEditBudget = (budget: BudgetType) => {
    setSelectedBudget(budget);
    setOpenForm(true);
  };

  const handleUpdateBudget = (updatedBudget: Partial<BudgetType>) => {
    if (selectedBudget) {
      dispatch(updateBudget({ ...selectedBudget, ...updatedBudget }));
    }
    setOpenForm(false);
    setSelectedBudget(undefined);
  };

  const handleDeleteBudget = (budgetId: string) => {
    dispatch(deleteBudget(budgetId));
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedBudget(undefined);
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Budget
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
        >
          Add Budget
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BudgetOverview budgets={budgets} />
        </Grid>

        {budgets.map((budget) => (
          <Grid item xs={12} sm={6} md={4} key={budget.id}>
            <BudgetCard
              budget={budget}
              onEdit={handleEditBudget}
              onDelete={handleDeleteBudget}
            />
          </Grid>
        ))}
      </Grid>

      <BudgetForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={selectedBudget ? handleUpdateBudget : handleAddBudget}
        budget={selectedBudget}
      />
    </Box>
  );
};

export default Budget;
