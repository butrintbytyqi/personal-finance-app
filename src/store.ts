import { configureStore } from '@reduxjs/toolkit';
import financesReducer from './features/financesSlice';

export const store = configureStore({
  reducer: {
    finances: financesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
