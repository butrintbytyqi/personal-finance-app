import { configureStore, combineReducers } from '@reduxjs/toolkit';
import financesReducer from '../features/financesSlice';
import settingsReducer from '../features/settingsSlice';
import { loadState, saveState } from './localStorage';

const rootReducer = combineReducers({
  finances: financesReducer,
  settings: settingsReducer,
});

// Load persisted state
const persistedState = loadState();

// Create store with persisted state
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

// Subscribe to store changes to save state
let saveTimeout: NodeJS.Timeout;
store.subscribe(() => {
  // Debounce save operation to prevent excessive writes
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    const state = store.getState();
    saveState({
      finances: {
        ...state.finances,
        isLoading: false,
        error: null
      },
      settings: state.settings // Persist entire settings state
    });
  }, 1000); // Save after 1 second of no changes
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
