import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type DebtType = 'credit_card' | 'personal_loan' | 'mortgage' | 'student_loan' | 'other';

export interface DebtPayment {
  id: string;
  amount: number;
  date: string;
  note?: string;
}

export interface Debt {
  id: string;
  name: string;
  type: DebtType;
  amount: number;
  interestRate: number;
  minimumPayment: number;
  dueDate: number; // Day of month
  startDate: string;
  endDate?: string;
  lender: string;
  payments: DebtPayment[];
  autoPayEnabled: boolean;
  reminderEnabled: boolean;
  notes?: string;
}

interface DebtState {
  debts: Debt[];
  isLoading: boolean;
  error: string | null;
  filters: {
    type?: DebtType;
    sortBy: 'amount' | 'interestRate' | 'dueDate';
    sortOrder: 'asc' | 'desc';
  };
}

const initialState: DebtState = {
  debts: [],
  isLoading: false,
  error: null,
  filters: {
    sortBy: 'amount',
    sortOrder: 'desc',
  },
};

const debtSlice = createSlice({
  name: 'debt',
  initialState,
  reducers: {
    addDebt: (state, action: PayloadAction<Omit<Debt, 'id' | 'payments'>>) => {
      const newDebt: Debt = {
        ...action.payload,
        id: Date.now().toString(),
        payments: [],
      };
      state.debts.push(newDebt);
    },
    updateDebt: (state, action: PayloadAction<Partial<Debt> & { id: string }>) => {
      const index = state.debts.findIndex((debt) => debt.id === action.payload.id);
      if (index !== -1) {
        state.debts[index] = { ...state.debts[index], ...action.payload };
      }
    },
    deleteDebt: (state, action: PayloadAction<string>) => {
      state.debts = state.debts.filter((debt) => debt.id !== action.payload);
    },
    addPayment: (state, action: PayloadAction<{ debtId: string; payment: Omit<DebtPayment, 'id'> }>) => {
      const debt = state.debts.find((d) => d.id === action.payload.debtId);
      if (debt) {
        const newPayment: DebtPayment = {
          ...action.payload.payment,
          id: Date.now().toString(),
        };
        debt.payments.push(newPayment);
        debt.amount -= newPayment.amount;
      }
    },
    deletePayment: (state, action: PayloadAction<{ debtId: string; paymentId: string }>) => {
      const debt = state.debts.find((d) => d.id === action.payload.debtId);
      if (debt) {
        const payment = debt.payments.find((p) => p.id === action.payload.paymentId);
        if (payment) {
          debt.amount += payment.amount;
          debt.payments = debt.payments.filter((p) => p.id !== action.payload.paymentId);
        }
      }
    },
    setFilters: (state, action: PayloadAction<Partial<DebtState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Selectors
export const selectDebts = (state: RootState) => state.debt.debts;
export const selectDebtById = (id: string) => (state: RootState) =>
  state.debt.debts.find((debt) => debt.id === id);
export const selectTotalDebt = (state: RootState) =>
  state.debt.debts.reduce((total, debt) => total + debt.amount, 0);
export const selectDebtsByType = (type: DebtType) => (state: RootState) =>
  state.debt.debts.filter((debt) => debt.type === type);
export const selectUpcomingPayments = (state: RootState) => {
  const today = new Date();
  const currentDay = today.getDate();
  return state.debt.debts
    .filter((debt) => debt.dueDate > currentDay)
    .sort((a, b) => a.dueDate - b.dueDate);
};

export const {
  addDebt,
  updateDebt,
  deleteDebt,
  addPayment,
  deletePayment,
  setFilters,
  setLoading,
  setError,
} = debtSlice.actions;

export default debtSlice.reducer;
