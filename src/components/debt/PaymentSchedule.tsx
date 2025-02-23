import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Chip,
  Button,
  useTheme,
} from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { selectUpcomingPayments } from '../../features/debtSlice';
import { useFormatting } from '../../hooks/useFormatting';
import { useTranslation } from '../../hooks/useTranslation';

const PaymentSchedule = () => {
  const theme = useTheme();
  const upcomingDebts = useAppSelector(selectUpcomingPayments);
  const { formatCurrency } = useFormatting();
  const { t } = useTranslation();

  const getDaysUntilDue = (dueDate: number) => {
    const today = new Date();
    const currentDay = today.getDate();
    let daysUntil = dueDate - currentDay;
    
    if (daysUntil < 0) {
      // Payment is due next month
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
      daysUntil = lastDayOfMonth - currentDay + dueDate;
    }
    
    return daysUntil;
  };

  const getStatusColor = (daysUntil: number) => {
    if (daysUntil <= 3) return theme.palette.error.main;
    if (daysUntil <= 7) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  return (
    <Box>
      <List>
        {upcomingDebts.map((debt) => {
          const daysUntil = getDaysUntilDue(debt.dueDate);
          const statusColor = getStatusColor(daysUntil);

          return (
            <ListItem
              key={debt.id}
              sx={{
                borderLeft: 3,
                borderColor: statusColor,
                mb: 1,
                backgroundColor: `${statusColor}08`,
                borderRadius: 1,
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle1" component="div">
                    {debt.name}
                    <Chip
                      size="small"
                      label={`${t('debt.dueIn')} ${daysUntil} ${t('debt.days')}`}
                      sx={{
                        ml: 1,
                        backgroundColor: `${statusColor}15`,
                        color: statusColor,
                      }}
                    />
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="textSecondary" component="span">
                      {t('debt.minimumPayment')}: {formatCurrency(debt.minimumPayment)}
                    </Typography>
                    {debt.autoPayEnabled && (
                      <Chip
                        size="small"
                        label={t('debt.autoPayEnabled')}
                        sx={{ ml: 1 }}
                        color="success"
                      />
                    )}
                  </>
                }
              />
              <ListItemSecondaryAction>
                <Button
                  variant="outlined"
                  size="small"
                  color={daysUntil <= 3 ? 'error' : 'primary'}
                >
                  {t('debt.payNow')}
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      {upcomingDebts.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 3,
            color: 'text.secondary',
          }}
        >
          <Typography>{t('debt.noUpcomingPayments')}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PaymentSchedule;
