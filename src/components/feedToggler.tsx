import React, { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/currentUser';

import styled from 'styled-components';

const FeedToggle = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const NavItem = styled.li`
  display: flex;
`;

const StyleNavLink = styled(NavLink)`
  border-radius: 0;
  border: none;
  border-bottom: 2px solid transparent;
  background: 0 0;
  color: #aaa;
  cursor: pointer;
  padding: 8px 16px;
  font-size: 16px;
  text-decoration: none;
  &.active {
    border-bottom: 2px solid #5cb85c;
    color: #5cb85c;
  }
`;

export const FeedToggler: FC<IFeedToggler> = ({ tagName }) => {
  const [currentUserState] = useContext(CurrentUserContext);
  return (
    <FeedToggle>
      {currentUserState.isLoggedIn && (
        <NavItem>
          <StyleNavLink to="/feed">Yor feed</StyleNavLink>
        </NavItem>
      )}
      <NavItem>
        <StyleNavLink to="/" exact>
          Global feed
        </StyleNavLink>
      </NavItem>
      {tagName && (
        <NavItem>
          <StyleNavLink to={`/tags/${tagName}`} exact>
            {`# ${tagName}`}
          </StyleNavLink>
        </NavItem>
      )}
    </FeedToggle>
  );
};

interface IFeedToggler {
  tagName?: string;
}
