import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  useTheme,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useAppSelector } from '../../hooks/redux';
import { selectDebts, selectTotalDebt, DebtType } from '../../features/debtSlice';
import { useFormatting } from '../../hooks/useFormatting';
import { useTranslation } from '../../hooks/useTranslation';

const DebtSummary = () => {
  const theme = useTheme();
  const debts = useAppSelector(selectDebts);
  const totalDebt = useAppSelector(selectTotalDebt);
  const { formatCurrency } = useFormatting();
  const { t } = useTranslation();

  const calculateTypeTotal = (type: DebtType) =>
    debts
      .filter((debt) => debt.type === type)
      .reduce((sum, debt) => sum + debt.amount, 0);

  const totalPayments = debts.reduce(
    (sum, debt) => sum + debt.payments.reduce((pSum, p) => pSum + p.amount, 0),
    0
  );

  const highestInterestDebt = [...debts].sort((a, b) => b.interestRate - a.interestRate)[0];

  const summaryCards = [
    {
      title: t('debt.totalDebt'),
      value: formatCurrency(totalDebt),
      icon: AccountBalanceIcon,
      color: theme.palette.primary.main,
      progress: 100,
    },
    {
      title: t('debt.totalPaidOff'),
      value: formatCurrency(totalPayments),
      icon: TrendingDownIcon,
      color: theme.palette.success.main,
      progress: (totalPayments / (totalDebt + totalPayments)) * 100,
    },
    {
      title: t('debt.highestInterestRate'),
      value: highestInterestDebt ? `${highestInterestDebt.interestRate}%` : '0%',
      subtitle: highestInterestDebt ? `${highestInterestDebt.name} ${t('debt.per')} ${formatCurrency(highestInterestDebt.amount)}` : t('debt.noUpcomingPayments'),
      icon: TrendingUpIcon,
      color: theme.palette.error.main,
      progress: highestInterestDebt ? (highestInterestDebt.interestRate / 30) * 100 : 0,
    },
    {
      title: t('debt.averageInterestRate'),
      value: debts.length
        ? `${(debts.reduce((sum, debt) => sum + debt.interestRate, 0) / debts.length).toFixed(2)}%`
        : '0%',
      icon: TrendingUpIcon,
      color: theme.palette.warning.main,
      progress: (debts.reduce((sum, debt) => sum + debt.interestRate, 0) / (debts.length || 1) / 30) * 100,
    },
  ];

  return (
    <Grid container spacing={3}>
      {summaryCards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {card.value}
                  </Typography>
                  {card.subtitle && (
                    <Typography variant="body2" color="textSecondary">
                      {card.subtitle}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    backgroundColor: `${card.color}15`,
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <card.icon sx={{ color: card.color }} />
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(card.progress, 100)}
                  sx={{
                    backgroundColor: `${card.color}15`,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: card.color,
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DebtSummary;
