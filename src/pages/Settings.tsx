import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  Alert,
  Snackbar,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  toggleDarkMode,
  setPrimaryColor,
  setFontSize,
  setCurrency,
  setDateFormat,
  updateNotificationSettings,
} from '../features/settingsSlice';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSettings from '../components/settings/LanguageSettings';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'ALL', symbol: 'L', name: 'Albanian Lek' },
];

const dateFormats = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
];

const Settings = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const settings = useAppSelector((state) => state.settings);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
  };

  const handleThemeChange = () => {
    dispatch(toggleDarkMode());
    showSuccessMessage(t('settings.themeUpdated'));
  };

  const handleCurrencyChange = (event: any) => {
    dispatch(setCurrency(event.target.value));
    showSuccessMessage(t('settings.currencyUpdated'));
  };

  const handleDateFormatChange = (event: any) => {
    dispatch(setDateFormat(event.target.value));
    showSuccessMessage(t('settings.dateFormatUpdated'));
  };

  const handleNotificationChange = (setting: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateNotificationSettings({ [setting]: event.target.checked }));
    showSuccessMessage(t('settings.notificationsUpdated'));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('settings.title')}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('settings.appearance')}
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.theme.darkMode}
                    onChange={handleThemeChange}
                  />
                }
                label={t('settings.darkMode')}
              />

              <Box sx={{ mt: 2 }}>
                <FormControl fullWidth>
                  <Typography variant="subtitle2" gutterBottom>
                    {t('settings.currency')}
                  </Typography>
                  <Select
                    value={settings.preferences.currency}
                    onChange={handleCurrencyChange}
                  >
                    {currencies.map((currency) => (
                      <MenuItem key={currency.code} value={currency.code}>
                        {currency.symbol} - {currency.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mt: 2 }}>
                <FormControl fullWidth>
                  <Typography variant="subtitle2" gutterBottom>
                    {t('settings.dateFormat')}
                  </Typography>
                  <Select
                    value={settings.preferences.dateFormat}
                    onChange={handleDateFormatChange}
                  >
                    {dateFormats.map((format) => (
                      <MenuItem key={format.value} value={format.value}>
                        {format.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('settings.notifications')}
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.preferences.notifications.enabled}
                    onChange={handleNotificationChange('enabled')}
                  />
                }
                label={t('settings.enableNotifications')}
              />

              {settings.preferences.notifications.enabled && (
                <>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.preferences.notifications.email}
                        onChange={handleNotificationChange('email')}
                      />
                    }
                    label={t('settings.emailNotifications')}
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.preferences.notifications.push}
                        onChange={handleNotificationChange('push')}
                      />
                    }
                    label={t('settings.pushNotifications')}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
