import React from 'react';
import ReactDOM from 'react-dom';
import { match, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../store/homeStore';

const DeferredRenderAppRenderer = (_props, _railsContext, domNodeId) => {
  const store = configureStore(_props);
  const history = syncHistoryWithStore(
    browserHistory,
    store,
  );
  const routes = {
    childRoutes: [{
      path: '/page',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          const component = require('../containers/HomeContainer').default;
          callback(null, component);
        });
      },
    },
    {
      path: '/page/test2',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          const component = require('../containers/TestContainer').default;
          callback(null, component);
        });
      },
    }],
  };

  // This match is potentially asyncronous, because one of the routes
  // implements an asyncronous getComponent. Since we do server rendering for this
  // component, immediately rendering a Router could cause a client/server
  // checksum mismatch.
  match({ history, routes }, (error, _redirectionLocation, routerProps) => {
    if (error) {
      throw error;
    }

    const reactElement = <Router {...routerProps} />;
    ReactDOM.render(reactElement, document.getElementById(domNodeId));
  });
};

export default DeferredRenderAppRenderer;
