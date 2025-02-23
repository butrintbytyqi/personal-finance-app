import { useAppSelector } from './redux';
import { format as dateFnsFormat } from 'date-fns';

export const useFormatting = () => {
  const preferences = useAppSelector((state) => state.settings?.preferences);
  
  // Default values if preferences are not yet initialized
  const currency = preferences?.currency || 'USD';
  const dateFormat = preferences?.dateFormat || 'MM/DD/YYYY';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (date: Date | string | number) => {
    const dateObj = new Date(date);
    const format = dateFormat
      .replace('MM', 'MM')
      .replace('DD', 'dd')
      .replace('YYYY', 'yyyy');
    return dateFnsFormat(dateObj, format);
  };

  return {
    formatCurrency,
    formatDate,
    currency,
    dateFormat,
  };
};
