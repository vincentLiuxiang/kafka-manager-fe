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

renderApp();

