import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useLocalStorage } from './useLocalStorage';

export const useFetch = (url: string) => {
  const baseUrl = 'https://conduit.productionready.io/api';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<IResponse | null>(null);
  const [error, setError] = useState<IError | null>(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage('token');

  const doFetch = useCallback((options: AxiosRequestConfig = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : '',
        },
      },
    };
    if (!isLoading) return;

    const fetchData = async () => {
      try {
        const res: AxiosResponse = await axios(
          `${baseUrl}${url}`,
          requestOptions
        );
        setIsLoading(false);
        setResponse(res.data);
      } catch (error) {
        setIsLoading(false);
        setError(error.response.data);
      }
    };
    fetchData();
  }, [isLoading, options, token, url]);

  return { isLoading, response, error, doFetch };
};

export interface IResponse {
  articles: [
    {
      author: {
        username: string;
        image?: string;
      };
      createdAt: string;
      description: string;
      slug: string;
      title: string;
      tagList: string[];
    }
  ];
  user?: {
    token: string;
  };
  articlesCount?: number;
  tags?: string[];
}

interface IError {
  errors: {
    [key: string]: string[];
  };
}
