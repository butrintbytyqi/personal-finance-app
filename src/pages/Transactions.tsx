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

// Temporary mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: new Date().toISOString().split('T')[0],
    amount: 1500,
    category: 'salary',
    description: 'Monthly Salary',
    type: 'income',
  },
  {
    id: '2',
    date: new Date().toISOString().split('T')[0],
    amount: 50,
    category: 'food & dining',
    description: 'Grocery Shopping',
    type: 'expense',
  },
  // Add more mock transactions as needed
];

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
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

    setTransactions((prev) => [...prev, newTransaction]);
    setOpenForm(false);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenForm(true);
  };

  const handleUpdateTransaction = (updatedTransaction: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === selectedTransaction?.id ? { ...t, ...updatedTransaction } : t
      )
    );
    setOpenForm(false);
    setSelectedTransaction(undefined);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedTransaction(undefined);
  };

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
                transactions={transactions}
                onEditTransaction={handleEditTransaction}
                onDeleteTransaction={handleDeleteTransaction}
                page={page}
                rowsPerPage={rowsPerPage}
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
