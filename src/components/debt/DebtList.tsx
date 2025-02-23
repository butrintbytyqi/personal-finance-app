import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  TableSortLabel,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import {
  selectDebts,
  deleteDebt,
  DebtType,
  Debt,
  setFilters,
} from '../../features/debtSlice';
import { useFormatting } from '../../hooks/useFormatting';
import DebtForm from './DebtForm';
import PaymentForm from './PaymentForm';

const DebtTypeLabels: Record<DebtType, string> = {
  credit_card: 'Credit Card',
  personal_loan: 'Personal Loan',
  mortgage: 'Mortgage',
  student_loan: 'Student Loan',
  other: 'Other',
};

const DebtList = () => {
  const dispatch = useAppDispatch();
  const debts = useAppSelector(selectDebts);
  const filters = useAppSelector((state) => state.debt.filters);
  const { formatCurrency, formatDate } = useFormatting();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, debt: Debt) => {
    setAnchorEl(event.currentTarget);
    setSelectedDebt(debt);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDebt(null);
  };

  const handleEdit = () => {
    setIsEditOpen(true);
    handleMenuClose();
  };

  const handleAddPayment = () => {
    setIsPaymentOpen(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedDebt) {
      dispatch(deleteDebt(selectedDebt.id));
    }
    handleMenuClose();
  };

  const handleSort = (field: 'amount' | 'interestRate' | 'dueDate') => {
    dispatch(setFilters({
      sortBy: field,
      sortOrder: filters.sortBy === field && filters.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedDebts = [...debts].sort((a, b) => {
    const multiplier = filters.sortOrder === 'asc' ? 1 : -1;
    switch (filters.sortBy) {
      case 'amount':
        return (a.amount - b.amount) * multiplier;
      case 'interestRate':
        return (a.interestRate - b.interestRate) * multiplier;
      case 'dueDate':
        return (a.dueDate - b.dueDate) * multiplier;
      default:
        return 0;
    }
  });

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Debts</Typography>
          <Box display="flex" gap={2}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={filters.type || ''}
                onChange={(e) => dispatch(setFilters({ type: e.target.value as DebtType | undefined }))}
                label="Type"
              >
                <MenuItem value="">All</MenuItem>
                {Object.entries(DebtTypeLabels).map(([value, label]) => (
                  <MenuItem key={value} value={value}>{label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              size="small"
              placeholder="Search debts..."
              onChange={(e) => {/* Implement search */}}
            />
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={filters.sortBy === 'amount'}
                    direction={filters.sortOrder}
                    onClick={() => handleSort('amount')}
                  >
                    Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={filters.sortBy === 'interestRate'}
                    direction={filters.sortOrder}
                    onClick={() => handleSort('interestRate')}
                  >
                    Interest Rate
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={filters.sortBy === 'dueDate'}
                    direction={filters.sortOrder}
                    onClick={() => handleSort('dueDate')}
                  >
                    Due Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>Lender</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedDebts.map((debt) => (
                <TableRow key={debt.id}>
                  <TableCell>{debt.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={DebtTypeLabels[debt.type]}
                      size="small"
                      color={debt.type === 'credit_card' ? 'error' : 'default'}
                    />
                  </TableCell>
                  <TableCell>{formatCurrency(debt.amount)}</TableCell>
                  <TableCell>{debt.interestRate}%</TableCell>
                  <TableCell>Day {debt.dueDate}</TableCell>
                  <TableCell>{debt.lender}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuOpen(e, debt)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleAddPayment}>Add Payment</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>

        {selectedDebt && (
          <>
            <DebtForm
              open={isEditOpen}
              onClose={() => setIsEditOpen(false)}
              debt={selectedDebt}
            />
            <PaymentForm
              open={isPaymentOpen}
              onClose={() => setIsPaymentOpen(false)}
              debtId={selectedDebt.id}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DebtList;
