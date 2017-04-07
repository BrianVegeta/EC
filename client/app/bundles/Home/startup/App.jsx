import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
import configureStore from '../store/homeStore';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
// railsContext provides contextual information especially useful for server rendering, such as
// knowing the locale. See the React on Rails documentation for more info on the railsContext
const routesSetting = require('../routes/index');

const propTypes = {
  routesHelper: PropTypes.object.isRequired,
};
const customUseScroll = ((prevRouterProps, { routes }) => {
  if (routes.some(route => route.ignoreScrollBehavior)) {
    return false;
  }

  if (routes.some(route => route.scrollToTop)) {
    return [0, 0];
  }
  return true;
});
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
        routes={routesSetting.default(routesHelper)}
        render={applyRouterMiddleware(useScroll(customUseScroll))}
      />
    </Provider>
  );
};
App.propTypes = propTypes;
export default App;
