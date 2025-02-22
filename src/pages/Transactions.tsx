import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionList from '../components/transactions/TransactionList';
import TransactionForm from '../components/transactions/TransactionForm';
import { Transaction } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from '../features/financesSlice';

const Transactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.finances.transactions);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    type: 'all',
    category: 'all',
    minAmount: '',
    maxAmount: '',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openForm, setOpenForm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>(undefined);

  const handleFilterChange = (name: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      type: 'all',
      category: 'all',
      minAmount: '',
      maxAmount: '',
    });
  };

  const handleAddTransaction = (transaction: Partial<Transaction>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(), // In a real app, this would be handled by the backend
    } as Transaction;

    dispatch(addTransaction(newTransaction));
    setOpenForm(false);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenForm(true);
  };

  const handleUpdateTransaction = (updatedTransaction: Partial<Transaction>) => {
    if (selectedTransaction) {
      dispatch(updateTransaction({ ...selectedTransaction, ...updatedTransaction }));
    }
    setOpenForm(false);
    setSelectedTransaction(undefined);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    dispatch(deleteTransaction(transactionId));
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedTransaction(undefined);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (filters.startDate && new Date(transaction.date) < new Date(filters.startDate)) {
      return false;
    }
    if (filters.endDate && new Date(transaction.date) > new Date(filters.endDate)) {
      return false;
    }
    if (filters.type !== 'all' && transaction.type !== filters.type) {
      return false;
    }
    if (filters.category !== 'all' && transaction.category !== filters.category) {
      return false;
    }
    if (filters.minAmount && transaction.amount < Number(filters.minAmount)) {
      return false;
    }
    if (filters.maxAmount && transaction.amount > Number(filters.maxAmount)) {
      return false;
    }
    return true;
  });

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Transactions
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
        >
          Add Transaction
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TransactionFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TransactionList
                transactions={filteredTransactions}
                onEditTransaction={handleEditTransaction}
                onDeleteTransaction={handleDeleteTransaction}
                page={page}
                rowsPerPage={rowsPerPage}
                totalCount={filteredTransactions.length}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TransactionForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={selectedTransaction ? handleUpdateTransaction : handleAddTransaction}
        transaction={selectedTransaction}
      />
    </Box>
  );
};

export default Transactions;
