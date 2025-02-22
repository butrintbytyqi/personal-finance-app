import { configureStore, combineReducers } from '@reduxjs/toolkit';
import financesReducer from './financesSlice';
import settingsReducer from './settingsSlice';

// Load persisted state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('financeAppState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('financeAppState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const rootReducer = combineReducers({
  finances: financesReducer,
  settings: settingsReducer,
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
    },
    settings: state.settings
  });
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
