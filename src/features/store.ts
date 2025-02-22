import { configureStore } from '@reduxjs/toolkit';
import financesReducer from './financesSlice';

export const store = configureStore({
  reducer: {
    finances: financesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
