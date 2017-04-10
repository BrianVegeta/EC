import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
import configureStore from '../store/homeStore';
import customUseScroll from './scroll';

const routes = require('../routes');

const propTypes = {
  routesHelper: PropTypes.object.isRequired,
};
const App = (props, railsContext) => {
  const store = configureStore(props);
  const history = syncHistoryWithStore(
    browserHistory,
    store,
  );
  const { routesHelper } = props;

  return (
    <Provider store={store}>
      <Router
        history={history}
        routes={routes.default(routesHelper, store.dispatch)}
        render={applyRouterMiddleware(useScroll(customUseScroll))}
      />
    </Provider>
  );
};
App.propTypes = propTypes;
export default App;


// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
// railsContext provides contextual information especially useful for server rendering, such as
// knowing the locale. See the React on Rails documentation for more info on the railsContext
