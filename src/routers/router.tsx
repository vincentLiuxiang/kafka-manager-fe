import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import Home from './page/home';

class RouterDom extends React.Component {
  public render() {
    return (
      <Router>
        <div className="router-nav">
          <Route path="/" exact={true} component={Home} />
        </div>
      </Router>
    );
  }
}

export default hot(RouterDom);
