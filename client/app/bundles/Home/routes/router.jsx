import React from 'react';
import Layout from '../containers/LayoutContainer';

export default {
  path: '/',
  component: Layout,
  childRoutes: [
    {
      path: '/',
      getComponents(_nextState, callback) {
        require.ensure([], (require) => {
          const component = require('../containers/HomeContainer').default;
          callback(null, { main: component });
        });
      },
    },
    {
      path: '/page',
      getComponents(_nextState, callback) {
        require.ensure([], (require) => {
          const component = require('../containers/HomeContainer').default;
          callback(null, { main: component });
        });
      },
    },
    {
      path: '/page/test2',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          const component = require('../containers/TestContainer').default;
          callback(null, { main: component });
        });
      },
    },
  ],
};
