import React, { FC, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Feed } from '../../components/feed';
import { Pagination } from '../../components/pagination';
import { getPaginator } from '../../utils/getPaginator';
import { stringify } from 'query-string';
import { PopularTags } from '../../components/popularTags';
import { Loading } from '../../components/loading';
import { ErrorMessage } from '../../components/errorMessage';

import styled from 'styled-components';
import { FeedToggler } from '../../components/feedToggler';

const Banner = styled.div`
  background: #5cb85c;
  color: #fff;
  padding: 32px;
  margin-bottom: 32px;
  text-align: center;
  box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.3),
    inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
  h1 {
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    font-size: 56px;
    margin: 0;
    font-weight: 700;
    padding-bottom: 8px;
  }
  p {
    margin: 0;
    font-size: 24px;
    font-style: italic;
  }
`;
const ContainerPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 24px auto 0 auto;
  padding: 0 15px;
  max-width: 1140px;
  > div:first-child {
    flex-grow: 2;
  }
`;

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
    <div>
      <Banner>
        <h1>medium clone</h1>
        <p>A place to share knowledge</p>
      </Banner>
      <ContainerPage>
        <div>
          <FeedToggler tagName={tagName} />
          {isLoading && <Loading />}
          {error && <ErrorMessage />}
          {!isLoading && response && (
            <>
              <Feed articles={response.articles} />
              <Pagination
                total={response.articlesCount!}
                limit={limit}
                url={url}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
        <div>
          <PopularTags />
        </div>
      </ContainerPage>
    </div>
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
