export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  notes?: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'yearly';
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
}

export interface UserSettings {
  currency: string;
  language: string;
  darkMode: boolean;
  notifications: boolean;
  email: string;
}

export interface User {
  id: string;
  email: string;
  settings: UserSettings;
}
