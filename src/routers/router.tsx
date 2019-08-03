import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import Home from './page/home';
import Admin from './page/admin';

class RouterDom extends React.Component {
  public render() {
    return (
      <Router>
        <Route path="/admin/:page" component={Admin} />
        <Route path="/admin/" exact={true} component={Admin} />
        <Route path="/user/:page" component={Home} />
        <Route path="/" exact={true} component={Home} />
      </Router>
    );
  }
}

export default hot(RouterDom);
