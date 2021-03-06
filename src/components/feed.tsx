import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IResponse } from '../hooks/useFetch';

const ArticlePreview = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 24px;
  font-size: 16px;
  margin-right: 15px;
`;

const ArticleMeta = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
`;

const UserIcon = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 30px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 24px 0 5px;
`;

const AuthorLink = styled(Link)`
  color: #5cb85c;
  text-decoration: none;
`;

const ArticleDate = styled.span`
  color: #bbb;
  font-size: 13px;
`;

const PreviewLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  h1 {
    width: fit-content;
    font-weight: 600;
    margin-bottom: 3px;
    font-size: 24px;
    color: black;
    cursor: pointer;
  }
  p {
    width: fit-content;
    color: #999;
    margin: 0 0 15px 0;
    cursor: pointer;
  }
  span {
    width: fit-content;
    color: #bbb;
    font-size: 12px;
    cursor: pointer;
  }
`;

const TagList = styled.ul`
  max-width: 50%;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  align-self: flex-end;
  li {
    padding: 2px 7.7px;
    margin: 0 0 3.2px 3px;
    border: 1px solid #ddd;
    color: #aaa;
    background: 0 0;
    border-radius: 50px;
    font-size: 12.8px;
  }
`;

export const Feed: FC<IResponse> = ({ articles }) => {
  return (
    <div>
      {articles.map((article, index) => (
        <ArticlePreview key={index}>
          <ArticleMeta>
            <Link to={`/profiles/${article.author.username}`}>
              <UserIcon src={article.author.image} alt="" />
            </Link>
            <Info>
              <AuthorLink to={`/profiles/${article.author.username}`}>
                {article.author.username}
              </AuthorLink>
              <ArticleDate>{article.createdAt}</ArticleDate>
            </Info>
          </ArticleMeta>
          <PreviewLink to={`/article/${article.slug}`}>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
            <TagList>
              {article.tagList!.map((tag: string) => (
                <li key={tag}>{tag}</li>
              ))}
            </TagList>
          </PreviewLink>
        </ArticlePreview>
      ))}
    </div>
  );
};
