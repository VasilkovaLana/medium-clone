import { useEffect, useContext } from 'react';
import { useFetch } from '../hooks/useFetch';
import { CurrentUserContext, IState } from '../contexts/currentUser';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const CurrentUserChecker = ({ children }: any) => {
  const { response, doFetch } = useFetch('/user');
  const [, setCurrentUserState] = useContext(CurrentUserContext);
  const [token] = useLocalStorage('token');

  useEffect(() => {
    if (!token) {
      setCurrentUserState((state: IState) => ({
        ...state,
        isLoggedIn: false,
      }));
      return;
    }
    doFetch();
    setCurrentUserState((state: IState) => ({
      ...state,
      isLoading: true,
    }));
  }, [token, setCurrentUserState, doFetch]);

  useEffect(() => {
    if (!response) return;

    setCurrentUserState((state: IState) => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user,
    }));
  }, [response, setCurrentUserState]);

  return children;
};
