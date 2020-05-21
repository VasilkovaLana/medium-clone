import { Switch, Route } from 'react-router-dom';
import React from 'react';

import { GlobalFeed } from './pages/globalFeed';
import { Article } from './pages/article';
import { TagFeed } from './pages/tagFeed';
import { Authentication } from './pages/authentication/authentication';
import { YourFeed } from './pages/yourFeed';

export default () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/feed" component={YourFeed} />
      <Route path="/tags/:slug" component={TagFeed} exact />
      <Route path="/login" component={Authentication} />
      <Route path="/register" component={Authentication} />
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  );
};
