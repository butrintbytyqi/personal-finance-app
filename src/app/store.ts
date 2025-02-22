import { configureStore, combineReducers } from '@reduxjs/toolkit';
import financesReducer from '../features/financesSlice';
import { loadState, saveState } from './localStorage';

const rootReducer = combineReducers({
  finances: financesReducer,
});

const persistedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

// Subscribe to store changes to save state
store.subscribe(() => {
  const state = store.getState();
  saveState({
    finances: {
      ...state.finances,
      isLoading: false,
      error: null
    }
  });
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
