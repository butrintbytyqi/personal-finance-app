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
  addBudget,
  updateBudget,
  deleteBudget,
} from '../features/financesSlice';
import BudgetOverview from '../components/budget/BudgetOverview';
import BudgetForm from '../components/budget/BudgetForm';
import { Budget as BudgetType } from '../types';

const Budget = () => {
  const dispatch = useAppDispatch();
  const budgets = useAppSelector((state) => state.finances.budgets);
  const [openForm, setOpenForm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<BudgetType | undefined>();

  const handleOpenForm = () => {
    setSelectedBudget(undefined);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedBudget(undefined);
  };

  const handleAddBudget = (newBudget: Omit<BudgetType, 'id'>) => {
    dispatch(addBudget(newBudget));
    setOpenForm(false);
  };

  const handleEditBudget = (budget: BudgetType) => {
    setSelectedBudget(budget);
    setOpenForm(true);
  };

  const handleUpdateBudget = (updatedBudget: Omit<BudgetType, 'id'>) => {
    if (selectedBudget) {
      dispatch(updateBudget({
        id: selectedBudget.id,
        changes: updatedBudget
      }));
    }
    setOpenForm(false);
    setSelectedBudget(undefined);
  };

  const handleDeleteBudget = (budgetId: string) => {
    dispatch(deleteBudget(budgetId));
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
          onClick={handleOpenForm}
        >
          Add Budget
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BudgetOverview
            budgets={budgets}
            onEdit={handleEditBudget}
            onDelete={handleDeleteBudget}
          />
        </Grid>
      </Grid>

      <BudgetForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={selectedBudget ? handleUpdateBudget : handleAddBudget}
        initialValues={selectedBudget}
      />
    </Box>
  );
};

export default Budget;
