import { useState, useEffect } from 'react';

export const useLocalStorage = (
  key: string,
  initialValue: string = ''
): [string, (item: string) => void] => {
  if (!key) {
    throw new Error('Key must be provided to persist to localStorage');
  }
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
