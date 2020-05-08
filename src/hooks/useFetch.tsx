import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const useFetch = (url: string) => {
  const baseUrl = 'https://conduit.productionready.io/api';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<IResponse | null>(null);
  const [error, setError] = useState<IError | null>(null);
  const [options, setOptions] = useState({});

  const doFetch = (options: AxiosRequestConfig) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) return;

    const fetchData = async () => {
      try {
        const res: AxiosResponse = await axios(`${baseUrl}${url}`, options);
        setIsLoading(false);
        setResponse(res.data);
      } catch (error) {
        setIsLoading(false);
        setError(error.response.data);
      }
    };
    fetchData();
  }, [isLoading, options, url]);

  return { isLoading, response, error, doFetch };
};

interface IResponse {
  user: {
    token: string;
  };
}

interface IError {
  errors: {
    [key: string]: string[];
  };
}
