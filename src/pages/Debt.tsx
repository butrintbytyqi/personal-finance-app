import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { selectDebts, selectTotalDebt } from '../features/debtSlice';
import { useFormatting } from '../hooks/useFormatting';
import { useTranslation } from '../hooks/useTranslation';
import DebtList from '../components/debt/DebtList';
import DebtSummary from '../components/debt/DebtSummary';
import DebtForm from '../components/debt/DebtForm';
import DebtChart from '../components/debt/DebtChart';
import PaymentSchedule from '../components/debt/PaymentSchedule';

const Debt = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const debts = useAppSelector(selectDebts);
  const totalDebt = useAppSelector(selectTotalDebt);
  const { formatCurrency } = useFormatting();
  const { t } = useTranslation();
  const [isAddDebtOpen, setIsAddDebtOpen] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">{t('debt.title')}</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddDebtOpen(true)}
          >
            {t('debt.addDebt')}
          </Button>
        </Grid>

        {/* Summary Cards */}
        <Grid item xs={12}>
          <DebtSummary />
        </Grid>

        {/* Debt Distribution Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('debt.debtDistribution')}
              </Typography>
              <DebtChart />
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Schedule */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('debt.upcomingPayments')}
              </Typography>
              <PaymentSchedule />
            </CardContent>
          </Card>
        </Grid>

        {/* Debt List */}
        <Grid item xs={12}>
          <DebtList />
        </Grid>
      </Grid>

      {/* Add Debt Dialog */}
      <DebtForm
        open={isAddDebtOpen}
        onClose={() => setIsAddDebtOpen(false)}
      />
    </Box>
  );
};

export default Debt;
