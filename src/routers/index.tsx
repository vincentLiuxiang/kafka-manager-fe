import aio from '@dt/common-header';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import * as React from 'react';

import * as store from 'store';
import Router from './router';

const renderApp = () => {
  ReactDOM.render(
    <Provider {...store}>
      <Router />
    </Provider>,
    document.getElementById('root'),
  );
};

aio.render('datastudio').then((ctx: any) => {
  store.baseInfo.currentProject = ctx.currentProject;
  store.baseInfo.userInfo = ctx.userInfo;
  renderApp();
});
