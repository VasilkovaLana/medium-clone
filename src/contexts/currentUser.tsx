import React, { createContext, useState } from 'react';

export const CurrentUserContext: any = createContext([{}, () => {}]);

export const CurrentUserProvider = ({ children }: any) => {
  const [state, setState] = useState<IState>({
    isLoading: false,
    isLoggedIn: false,
    currentUser: null,
  });
  return (
    <CurrentUserContext.Provider value={[state, setState]}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export interface IState {
  isLoading: boolean;
  isLoggedIn: boolean;
  currentUser: {} | null;
}
