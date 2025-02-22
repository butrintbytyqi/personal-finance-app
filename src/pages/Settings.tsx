import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  MenuItem,
  Alert,
  Snackbar,
  Select,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import { ColorLens, Refresh, Brightness4, NotificationsActive } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  toggleDarkMode,
  setPrimaryColor,
  setFontSize,
  setCurrency,
  setLanguage,
  setDateFormat,
  updateNotificationSettings,
  updateAccountInfo,
  resetSettings,
} from '../features/settingsSlice';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
];

const dateFormats = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
];

const fontSizes = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];

const notificationFrequencies = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const Settings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
  };

  const handleThemeChange = () => {
    dispatch(toggleDarkMode());
    showSuccessMessage('Theme updated successfully!');
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPrimaryColor(event.target.value));
    showSuccessMessage('Primary color updated!');
  };

  const handleFontSizeChange = (event: SelectChangeEvent) => {
    dispatch(setFontSize(event.target.value as 'small' | 'medium' | 'large'));
    showSuccessMessage('Font size updated!');
  };

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    dispatch(setCurrency(event.target.value));
    showSuccessMessage('Currency preference updated!');
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    dispatch(setLanguage(event.target.value));
    showSuccessMessage('Language preference updated!');
  };

  const handleDateFormatChange = (event: SelectChangeEvent) => {
    dispatch(setDateFormat(event.target.value));
    showSuccessMessage('Date format updated!');
  };

  const handleNotificationChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateNotificationSettings({ [key]: event.target.checked }));
    showSuccessMessage('Notification settings updated!');
  };

  const handleNotificationFrequencyChange = (event: SelectChangeEvent) => {
    dispatch(updateNotificationSettings({
      frequency: event.target.value as 'daily' | 'weekly' | 'monthly'
    }));
    showSuccessMessage('Notification frequency updated!');
  };

  const handleAccountInfoChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAccountInfo({ [key]: event.target.value }));
    showSuccessMessage('Account information updated!');
  };

  const handleResetSettings = () => {
    dispatch(resetSettings());
    showSuccessMessage('Settings have been reset to defaults!');
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Settings
        </Typography>
        <Tooltip title="Reset all settings">
          <IconButton onClick={handleResetSettings} color="primary">
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={3}>
        {/* Theme Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Brightness4 />
                <Typography variant="h6">Theme Settings</Typography>
              </Stack>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.theme.darkMode}
                        onChange={handleThemeChange}
                      />
                    }
                    label="Dark Mode"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Primary Color"
                    type="color"
                    value={settings.theme.primaryColor}
                    onChange={handleColorChange}
                    InputProps={{
                      startAdornment: <ColorLens />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Font Size</InputLabel>
                    <Select
                      value={settings.theme.fontSize}
                      onChange={handleFontSizeChange}
                      label="Font Size"
                    >
                      {fontSizes.map((size) => (
                        <MenuItem key={size.value} value={size.value}>
                          {size.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Preferences */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Preferences
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={settings.preferences.currency}
                      onChange={handleCurrencyChange}
                      label="Currency"
                    >
                      {currencies.map((currency) => (
                        <MenuItem key={currency.code} value={currency.code}>
                          {currency.symbol} - {currency.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={settings.preferences.language}
                      onChange={handleLanguageChange}
                      label="Language"
                    >
                      {languages.map((language) => (
                        <MenuItem key={language.code} value={language.code}>
                          {language.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Date Format</InputLabel>
                    <Select
                      value={settings.preferences.dateFormat}
                      onChange={handleDateFormatChange}
                      label="Date Format"
                    >
                      {dateFormats.map((format) => (
                        <MenuItem key={format.value} value={format.value}>
                          {format.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <NotificationsActive />
                <Typography variant="h6">Notification Settings</Typography>
              </Stack>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.preferences.notifications.enabled}
                        onChange={handleNotificationChange('enabled')}
                      />
                    }
                    label="Enable Notifications"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.preferences.notifications.email}
                        onChange={handleNotificationChange('email')}
                        disabled={!settings.preferences.notifications.enabled}
                      />
                    }
                    label="Email Notifications"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.preferences.notifications.push}
                        onChange={handleNotificationChange('push')}
                        disabled={!settings.preferences.notifications.enabled}
                      />
                    }
                    label="Push Notifications"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel>Frequency</InputLabel>
                    <Select
                      value={settings.preferences.notifications.frequency}
                      onChange={handleNotificationFrequencyChange}
                      label="Frequency"
                      disabled={!settings.preferences.notifications.enabled}
                    >
                      {notificationFrequencies.map((freq) => (
                        <MenuItem key={freq.value} value={freq.value}>
                          {freq.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Account Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={settings.account.name}
                    onChange={handleAccountInfoChange('name')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={settings.account.email}
                    onChange={handleAccountInfoChange('email')}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
