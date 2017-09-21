import React from 'react';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { setReferrerPath } from 'modules/routingHelper';
import configureStore from '../store/configureStore';
import customUseScroll from './scroll';

const routes = require('../routes');

/**
 *
 * @props
 * @railsContext
 *
 */
class App extends React.Component {

  constructor(props) {
    super(props);
    this.store = configureStore(props);
    this.history = syncHistoryWithStore(
      browserHistory,
      this.store,
    );
    this.history.listen((location) => {
      this.store.dispatch(setReferrerPath(location));
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        <Router
          history={this.history}
          routes={routes.default(this.store)}
          render={applyRouterMiddleware(useScroll(customUseScroll))}
        />
      </Provider>
    );
  }
}

export default App;


// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
// railsContext provides contextual information especially useful for server rendering, such as
// knowing the locale. See the React on Rails documentation for more info on the railsContext
