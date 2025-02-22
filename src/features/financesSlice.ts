import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, Budget, Account, User } from '../types';

interface FinancesState {
  user: User | null;
  transactions: Transaction[];
  budgets: Budget[];
  accounts: Account[];
  loading: boolean;
  error: string | null;
}

const initialState: FinancesState = {
  user: null,
  transactions: [],
  budgets: [],
  accounts: [],
  loading: false,
  error: null,
};

const financesSlice = createSlice({
  name: 'finances',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    updateBudget: (state, action: PayloadAction<Budget>) => {
      const index = state.budgets.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.budgets[index] = action.payload;
      }
    },
    updateAccount: (state, action: PayloadAction<Account>) => {
      const index = state.accounts.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
    },
  },
});

export const { setUser, addTransaction, updateBudget, updateAccount } = financesSlice.actions;
export default financesSlice.reducer;
