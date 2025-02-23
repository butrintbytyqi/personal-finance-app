import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, Budget, Account, User, UserSettings } from '../types';
import { RootState } from '../store';
import { v4 as uuidv4 } from 'uuid';

interface FinancesState {
  user: {
    id: string;
    name: string;
    email: string;
    preferences: UserSettings;
  } | null;
  accounts: Account[];
  transactions: Transaction[];
  budgets: Budget[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FinancesState = {
  user: {
    id: '1',
    name: 'User',
    email: 'user@example.com',
    preferences: {
      theme: {
        mode: 'light',
        primaryColor: '#1976d2'
      },
      language: 'sq',
      currency: 'EUR',
      dateFormat: 'DD/MM/YYYY',
      notifications: {
        enabled: true,
        email: false,
        push: true,
        frequency: 'daily'
      }
    }
  },
  accounts: [],
  transactions: [],
  budgets: [],
  isLoading: false,
  error: null
};

export const financesSlice = createSlice({
  name: 'finances',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id'>>) => {
      const newTransaction: Transaction = {
        id: uuidv4(),
        ...action.payload
      };
      state.transactions.push(newTransaction);
    },
    updateTransaction: (state, action: PayloadAction<{ id: string; changes: Partial<Transaction> }>) => {
      const { id, changes } = action.payload;
      const index = state.transactions.findIndex(t => t.id === id);
      if (index !== -1) {
        state.transactions[index] = {
          ...state.transactions[index],
          ...changes
        };
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
    addAccount: (state, action: PayloadAction<Omit<Account, 'id'>>) => {
      const newAccount: Account = {
        id: uuidv4(),
        ...action.payload
      };
      state.accounts.push(newAccount);
    },
    updateAccount: (state, action: PayloadAction<{ id: string; changes: Partial<Account> }>) => {
      const { id, changes } = action.payload;
      const index = state.accounts.findIndex(a => a.id === id);
      if (index !== -1) {
        state.accounts[index] = {
          ...state.accounts[index],
          ...changes
        };
      }
    },
    deleteAccount: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.filter(a => a.id !== action.payload);
    },
    addBudget: (state, action: PayloadAction<Omit<Budget, 'id'>>) => {
      const newBudget: Budget = {
        id: uuidv4(),
        ...action.payload
      };
      state.budgets.push(newBudget);
    },
    updateBudget: (state, action: PayloadAction<{ id: string; changes: Partial<Budget> }>) => {
      const { id, changes } = action.payload;
      const index = state.budgets.findIndex(b => b.id === id);
      if (index !== -1) {
        state.budgets[index] = {
          ...state.budgets[index],
          ...changes
        };
      }
    },
    deleteBudget: (state, action: PayloadAction<string>) => {
      state.budgets = state.budgets.filter(b => b.id !== action.payload);
    },
    updateUserSettings: (state, action: PayloadAction<Partial<UserSettings>>) => {
      if (state.user) {
        state.user.preferences = {
          ...state.user.preferences,
          ...action.payload
        };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  addAccount,
  updateAccount,
  deleteAccount,
  addBudget,
  updateBudget,
  deleteBudget,
  updateUserSettings,
  setLoading,
  setError
} = financesSlice.actions;

export const selectUserSettings = (state: RootState) => state.finances.user?.preferences;

export default financesSlice.reducer;
