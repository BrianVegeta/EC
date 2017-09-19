import React from 'react';
// import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { loginPath, registrationPath } from 'lib/paths';
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
const App = (props) => {
  const store = configureStore(props);
  const history = syncHistoryWithStore(
    browserHistory,
    store,
  );

  history.listen((location) => {
    const { pathname } = location;
    const exclusion = [loginPath, registrationPath];
    if (!exclusion.includes(pathname)) {
      store.dispatch(setReferrerPath(pathname));
    }
  });

  return (
    <Provider store={store}>
      <Router
        history={history}
        routes={routes.default(store)}
        render={applyRouterMiddleware(useScroll(customUseScroll))}
      />
    </Provider>
  );
};
// App.propTypes = propTypes;
export default App;


// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
// railsContext provides contextual information especially useful for server rendering, such as
// knowing the locale. See the React on Rails documentation for more info on the railsContext
