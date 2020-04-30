import React, { FC, useState, useEffect, FormEvent } from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

import styled from 'styled-components';

const AuthPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  width: 540px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Logo = styled.h1`
  font-size: 40px;
  color: rgb(55, 58, 60);
  font-weight: 500;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: #5cb85c;
  text-decoration: none;
  font-size: 16px;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const AuthInput = styled.input`
  color: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4.8px;
  cursor: text;
  font-size: 20px;
  font-weight: 400;
  padding: 12px 24px;
  margin-top: 16px;
  &:focus {
    border: 1px solid #66afe9;
    outline: none;
  }
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
`;
const Submit = styled.button`
  display: flex;
  align-self: flex-end;
  justify-content: center;
  width: 100px;
  height: 50px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #5cb85c;
  border: none;
  margin-top: 16px;
  border-radius: 4.8px;
  outline: none;
  &:hover {
    background-color: #449d44;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

export const Authentication: FC<RouteComponentProps> = ({ match }) => {
  const isLogin = match.path === '/login';
  const pageTitle = isLogin ? 'Sign In' : 'Sign Up';
  const descriptionLink = isLogin ? '/register' : '/login';
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?';
  const apiUrl = isLogin ? '/users/login' : '/users';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const { response, isLoading, error, doFetch } = useFetch(apiUrl);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = isLogin ? { email, password } : { email, password, username };
    doFetch({
      method: 'post',
      data: {
        user,
      },
    });
  };

  useEffect(() => {
    if (!response) return;
    localStorage.setItem('token', response.user.token);
    setIsSuccessfullSubmit(true);
  }, [response]);

  if (isSuccessfullSubmit) {
    return <Redirect to="/" />;
  }

  return (
    <AuthPage>
      <Container>
        <Logo>{pageTitle}</Logo>
        <StyledLink to={descriptionLink}>{descriptionText}</StyledLink>
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <AuthInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <AuthInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Submit type="submit" disabled={isLoading}>
            {pageTitle}
          </Submit>
        </Form>
      </Container>
    </AuthPage>
  );
};
