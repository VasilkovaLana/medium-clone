import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IResponse } from '../hooks/useFetch';

const ArticlePreview = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 24px 0;
  font-size: 16px;
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
  text-decoration: none;
  h1 {
    font-weight: 600;
    margin-bottom: 3px;
    cursor: pointer;
    font-size: 24px;
    color: black;
  }
  p {
    color: #999;
    margin: 0 0 15px 0;
  }
  span {
    color: #bbb;
    font-size: 12px;
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
              <ArticleDate className="date">{article.createdAt}</ArticleDate>
            </Info>
          </ArticleMeta>
          <PreviewLink to={`/article/${article.slug}`}>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
            <ul className="tag-list">
              {article.tagList!.map((tag: string) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </PreviewLink>
        </ArticlePreview>
      ))}
    </div>
  );
};
