export interface Transaction {
  id: string;
  date: string;
  title: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  notes?: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  accountNumber: string;
  currency: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'yearly';
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color?: string;
}

export type Language = 'sq' | 'en' | 'de' | 'fr';

export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
}

export interface UserSettings {
  theme: Theme;
  language: Language;
  currency: string;
  dateFormat: string;
  notifications: {
    enabled: boolean;
    email: boolean;
    push: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: UserSettings;
}

export type PaginationProps = {
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
