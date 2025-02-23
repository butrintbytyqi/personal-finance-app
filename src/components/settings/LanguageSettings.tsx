import React from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setLanguage } from '../../features/settingsSlice';
import { useTranslation } from '../../hooks/useTranslation';

type Language = 'en' | 'de' | 'fr' | 'sq';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'sq', name: 'Shqip', flag: '🇦🇱' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

const LanguageSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const language = useAppSelector((state) => state.settings.preferences.language) as Language;

  const handleLanguageChange = (newLanguage: Language) => {
    dispatch(setLanguage(newLanguage));
  };

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {t('settings.language.title')}
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="language-select-label">{t('settings.language.select')}</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={language}
          label={t('settings.language.select')}
          onChange={(e) => handleLanguageChange(e.target.value as Language)}
        >
          {languages.map(({ code, name, flag }) => (
            <MenuItem key={code} value={code}>
              {flag} {t(`settings.language.${code}`)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSettings;
