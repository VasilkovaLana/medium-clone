import React from 'react';
import { Link } from 'react-router-dom';
import { range } from '../utils/range';

import styled from 'styled-components';

const PaginationList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 16px 0;
  padding: 0;
  font-size: 16px;
  color: rgb(55, 58, 60);
  border-radius: 4px;
`;

const PageItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  border: 1px solid #ddd;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  padding: 8px 12px;
  color: rgb(55, 58, 60);
  &.active {
    color: #fff;
    cursor: default;
    background-color: #5cb85c;
    border-color: #5cb85c;
  }
`;

const PaginationItem = ({ page, currentPage, url }: IPaginationItem) => {
  return (
    <PageItem>
      <StyledLink
        to={`${url}?page=${page}`}
        className={page === currentPage ? 'active' : ''}
      >
        {page}
      </StyledLink>
    </PageItem>
  );
};

export const Pagination = ({ total, limit, url, currentPage }: IPagination) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);

  return (
    <PaginationList>
      {pages.map((page) => (
        <PaginationItem
          page={page}
          currentPage={currentPage}
          url={url}
          key={page}
        />
      ))}
    </PaginationList>
  );
};

interface IPaginationItem {
  page: number;
  currentPage: number;
  url: string;
}

interface IPagination {
  total: number;
  limit: number;
  url: string;
  currentPage: number;
}
