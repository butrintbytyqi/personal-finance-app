import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  theme: {
    darkMode: boolean;
    primaryColor: string;
    fontSize: 'small' | 'medium' | 'large';
  };
  preferences: {
    currency: string;
    language: string;
    dateFormat: string;
    notifications: {
      enabled: boolean;
      email: boolean;
      push: boolean;
      frequency: 'daily' | 'weekly' | 'monthly';
    };
  };
  account: {
    email: string;
    name: string;
    timezone: string;
  };
}

const initialState: SettingsState = {
  theme: {
    darkMode: false,
    primaryColor: '#2196f3',
    fontSize: 'medium',
  },
  preferences: {
    currency: 'USD',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    notifications: {
      enabled: true,
      email: true,
      push: true,
      frequency: 'daily',
    },
  },
  account: {
    email: '',
    name: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<SettingsState>) => {
      return action.payload;
    },
    toggleDarkMode: (state) => {
      state.theme.darkMode = !state.theme.darkMode;
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.theme.primaryColor = action.payload;
    },
    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.theme.fontSize = action.payload;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.preferences.currency = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.preferences.language = action.payload;
    },
    setDateFormat: (state, action: PayloadAction<string>) => {
      state.preferences.dateFormat = action.payload;
    },
    updateNotificationSettings: (state, action: PayloadAction<Partial<SettingsState['preferences']['notifications']>>) => {
      state.preferences.notifications = {
        ...state.preferences.notifications,
        ...action.payload,
      };
    },
    updateAccountInfo: (state, action: PayloadAction<Partial<SettingsState['account']>>) => {
      state.account = {
        ...state.account,
        ...action.payload,
      };
    },
    resetSettings: () => initialState,
  },
});

export const {
  setState,
  toggleDarkMode,
  setPrimaryColor,
  setFontSize,
  setCurrency,
  setLanguage,
  setDateFormat,
  updateNotificationSettings,
  updateAccountInfo,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
