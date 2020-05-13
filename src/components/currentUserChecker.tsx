import { useEffect, useContext } from 'react';
import { useFetch } from '../hooks/useFetch';
import { CurrentUserContext, IState } from '../contexts/currentUser';

export const CurrentUserChecker = ({ children }: any) => {
  const { response, doFetch } = useFetch('/user');
  const [, setCurrentUserState] = useContext(CurrentUserContext);

  useEffect(() => {
    doFetch();
    setCurrentUserState((state: IState) => ({
      ...state,
      isLoading: true,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
