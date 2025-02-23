import React from 'react';
import { Box, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useAppSelector } from '../../hooks/redux';
import { selectDebts, DebtType } from '../../features/debtSlice';
import { useFormatting } from '../../hooks/useFormatting';
import { useTranslation } from '../../hooks/useTranslation';

const DebtChart = () => {
  const theme = useTheme();
  const debts = useAppSelector(selectDebts);
  const { formatCurrency } = useFormatting();
  const { t } = useTranslation();

  const debtsByType = debts.reduce((acc, debt) => {
    const type = debt.type === 'other' ? t('debt.other') : debt.type;
    if (!acc[type]) {
      acc[type] = 0;
    }
    acc[type] += debt.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(debtsByType).map(([type, amount]) => ({
    name: type,
    value: amount,
  }));

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            p: 1.5,
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          <Box sx={{ color: payload[0].payload.fill }}>
            <strong>{payload[0].name}</strong>
          </Box>
          {formatCurrency(payload[0].value)}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DebtChart;
