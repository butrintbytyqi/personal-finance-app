import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import { Language } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import { useAppDispatch } from '../../hooks/redux';
import { updateUserSettings } from '../../features/financesSlice';

const languages = [
  { code: 'sq', name: 'Shqip', flag: '🇦🇱' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
] as const;

const LanguageSettings: React.FC = () => {
  const { t, language } = useTranslation();
  const dispatch = useAppDispatch();

  const handleLanguageChange = (newLanguage: Language) => {
    dispatch(updateUserSettings({
      language: newLanguage
    }));
  };

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {t('settings.language')}
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="language-select-label">{t('settings.language')}</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={language}
          label={t('settings.language')}
          onChange={(e) => handleLanguageChange(e.target.value as Language)}
        >
          {languages.map(({ code, name, flag }) => (
            <MenuItem key={code} value={code}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>{flag}</span>
                <span>{name}</span>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSettings;
