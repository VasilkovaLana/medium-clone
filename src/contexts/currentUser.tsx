import React, { createContext, useState } from 'react';

export const CurrentUserContext: any = createContext([{}, () => {}]);

export const CurrentUserProvider = ({ children }: any): any => {
  const [state, setState] = useState({
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
