import { parse } from 'query-string';

export const LIMIT = 10;

export const getPaginator = (search: string) => {
  const parsedSearch = parse(search);
  const currentPage = parsedSearch.page ? Number(parsedSearch.page) : 1;
  const offset = currentPage * 10 - LIMIT;
  return { currentPage, offset };
};
