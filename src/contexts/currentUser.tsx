import React, { FC, createContext, useReducer } from 'react';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  currentUser: null,
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true };
    case 'SET_AUTHORIZED':
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: action.payload,
      };
    case 'SET_UNAUTHORIZED':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

export const CurrentUserContext: any = createContext([]);

export const CurrentUserProvider: FC = ({ children }) => {
  const value = useReducer(reducer, initialState);

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};

interface IAction {
  type: string;
  payload: boolean | { token: string };
}

export interface IState {
  isLoading: boolean;
  isLoggedIn: boolean;
  currentUser: {} | null;
}
