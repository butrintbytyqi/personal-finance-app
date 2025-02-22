import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, Budget, Account, User, UserSettings } from '../types';

interface FinancesState {
  user: User | null;
  transactions: Transaction[];
  budgets: Budget[];
  accounts: Account[];
  isLoading: boolean;
  error: string | null;
}

const defaultUser: User = {
  id: '1',
  email: '',
  settings: {
    currency: 'USD',
    language: 'en',
    darkMode: false,
    notifications: true,
    email: '',
  },
};

const initialState: FinancesState = {
  user: defaultUser, // Initialize with default user
  transactions: [],
  budgets: [],
  accounts: [],
  isLoading: false,
  error: null,
};

const financesSlice = createSlice({
  name: 'finances',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    updateUserSettings: (state, action: PayloadAction<UserSettings>) => {
      if (state.user) {
        state.user.settings = action.payload;
      }
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
    setBudgets: (state, action: PayloadAction<Budget[]>) => {
      state.budgets = action.payload;
    },
    addBudget: (state, action: PayloadAction<Budget>) => {
      state.budgets.push(action.payload);
    },
    updateBudget: (state, action: PayloadAction<Budget>) => {
      const index = state.budgets.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.budgets[index] = action.payload;
      }
    },
    deleteBudget: (state, action: PayloadAction<string>) => {
      state.budgets = state.budgets.filter(b => b.id !== action.payload);
    },
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
    },
    addAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
    },
    updateAccount: (state, action: PayloadAction<Account>) => {
      const index = state.accounts.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
    },
    deleteAccount: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.filter(a => a.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUser,
  updateUserSettings,
  setTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setBudgets,
  addBudget,
  updateBudget,
  deleteBudget,
  setAccounts,
  addAccount,
  updateAccount,
  deleteAccount,
  setLoading,
  setError,
} = financesSlice.actions;

export default financesSlice.reducer;
