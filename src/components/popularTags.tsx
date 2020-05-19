import React, { useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { Loading } from './loading';
import { ErrorMessage } from './errorMessage';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Sidebar = styled.div`
  width: 241px;
  padding: 5px 10px 10px;
  background: #f3f3f3;
  border-radius: 4px;
  margin-left: 15px;
  p {
    font-size: 16px;
    margin: 0 0 9px 0;
    color: #373a3c;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TagLink = styled(Link)`
  color: #fff;
  background-color: #818a91;
  border-radius: 50px;
  cursor: pointer;
  font-size: 13px;
  margin: 0 3px 7px 0;
  padding: 4.6px 7.68px;
  text-decoration: none;
`;

export const PopularTags = () => {
  const { response, isLoading, error, doFetch } = useFetch('/tags');

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading || !response) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <Sidebar>
      <p> Popular tags</p>
      <TagList>
        {response!.tags!.map((tag) => (
          <TagLink key={tag} to={`/tags/${tag}`}>
            {tag}
          </TagLink>
        ))}
      </TagList>
    </Sidebar>
  );
};
