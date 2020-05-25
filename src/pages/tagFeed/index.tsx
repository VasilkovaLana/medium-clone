import React, { FC, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getPaginator } from '../../utils/getPaginator';
import { stringify } from 'query-string';
import { ViewFeed } from '../../pages/viewFeed';

export const TagFeed: FC<ITagFeed> = ({ location, match }) => {
  const tagName = match.params.slug;
  const limit = 10;
  const url = match.url;
  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset,
    tag: tagName,
  });
  const apiUrl = `/articles?${stringifiedParams}`;
  const { response, isLoading, error, doFetch } = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage, tagName]);

  return (
    <ViewFeed
      tagName={tagName}
      isLoading={isLoading}
      error={error!}
      response={response!}
      limit={limit}
      url={url}
      currentPage={currentPage}
    />
  );
};

interface ITagFeed {
  location: {
    search: string;
  };
  match: {
    url: string;
    params: {
      slug: string;
    };
  };
}
