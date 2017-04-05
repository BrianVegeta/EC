import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from '../store/homeStore';
import Layout from '../containers/LayoutContainer';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
// railsContext provides contextual information especially useful for server rendering, such as
// knowing the locale. See the React on Rails documentation for more info on the railsContext

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
      <Router history={history}>
        {{
          path: routesHelper.root,
          component: Layout,
          childRoutes: [
            {
              path: routesHelper.root,
              getComponents(_nextState, callback) {
                require.ensure([], (require) => {
                  const component = require('../containers/HomeContainer').default;
                  callback(null, { main: component });
                });
              },
            },
            {
              path: routesHelper.items,
              getComponents(_nextState, callback) {
                require.ensure([], (require) => {
                  const component = require('../containers/ItemsContainer').default;
                  callback(null, { main: component });
                });
              },
            },
          ],
        }}
      </Router>
    </Provider>
  );
};
App.propTypes = propTypes;
export default App;
