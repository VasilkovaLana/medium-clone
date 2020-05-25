import React, { FC, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getPaginator } from '../../utils/getPaginator';
import { stringify } from 'query-string';
import { ViewFeed } from '../../pages/viewFeed';

export const GlobalFeed: FC<IGlobalFeed> = ({ location, match }) => {
  const limit = 10;
  const url = match.url;
  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset,
  });
  const apiUrl = `/articles?${stringifiedParams}`;
  const { response, isLoading, error, doFetch } = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  return (
    <ViewFeed
      tagName={''}
      isLoading={isLoading}
      error={error!}
      response={response!}
      limit={limit}
      url={url}
      currentPage={currentPage}
    />
  );
};

interface IGlobalFeed {
  location: {
    search: string;
  };
  match: {
    url: string;
  };
}
