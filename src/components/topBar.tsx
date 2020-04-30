import React, { FC } from 'react';
import { NavLink, Link } from 'react-router-dom';

import styled from 'styled-components';

const Navbar = styled.nav`
  padding: 8px 16px;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const StyledLink = styled(Link)`
  font-size: 24px;
  margin-right: 32px;
  color: #5cb85c;
  cursor: pointer;
  text-decoration: none;
`;
const ListButtons = styled.div`
  display: flex;
`;
const StyledNavLink = styled(NavLink)`
  color: rgba(0, 0, 0, 0.3);
  font-size: 16px;
  padding: 6px 7px 0 7px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
  &.active {
    color: rgba(0, 0, 0, 0.8);
  }
`;

export const TopBar: FC = () => {
  return (
    <Navbar>
      <Container>
        <StyledLink to="/" className="navbar-logo">
          Medium
        </StyledLink>
        <ListButtons>
          <StyledNavLink to="/" exact>
            Home
          </StyledNavLink>
          <StyledNavLink to="/login">Sign in</StyledNavLink>
          <StyledNavLink to="/register">Sign up</StyledNavLink>
        </ListButtons>
      </Container>
    </Navbar>
  );
};
