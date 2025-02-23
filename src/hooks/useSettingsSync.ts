import { useEffect } from 'react';
import { useAppDispatch } from './redux';
import { SettingsState } from '../features/settingsSlice';

export const useSettingsSync = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'financeAppState') {
        const newState = JSON.parse(event.newValue || '{}');
        if (newState.settings) {
          // Dispatch all settings from the new state
          dispatch({ type: 'settings/setState', payload: newState.settings });
        }
      }
    };

    // Add event listener
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);
};
