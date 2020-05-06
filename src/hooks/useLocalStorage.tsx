import { useState, useEffect } from 'react';

export const useLocalStorage = (key: any, initialValue = ''): any => {
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, storedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedValue]);

  return [storedValue, setStoredValue];
};
