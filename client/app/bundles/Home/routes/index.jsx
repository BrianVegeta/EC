import Layout from '../containers/LayoutContainer';

const routes = routesHelper => ({
  path: routesHelper.root,
  component: Layout,
  childRoutes: [
    {
      path: routesHelper.root,
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          const component = require('../containers/HomeContainer').default;
          callback(null, { main: component });
        });
      },
    },
    {
      path: 'p/i/goods',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          const component = require('../containers/GoodsContainer').default;
          callback(null, { main: component });
        });
      },
      childRoutes: [
        {
          path: ':name-c.:id',
          getComponent(_nextState, callback) {
            require.ensure([], (require) => {
              const component = require('../containers/ItemsContainer').default;
              callback(null, { main: component });
            });
          },
        },
      ],
    },
    {
      path: '/p/i/service',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          const component = require('../containers/ServiceContainer').default;
          callback(null, { main: component });
        });
      },
    },
    {
      path: '/p/i/space',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          const component = require('../containers/SpaceContainer').default;
          callback(null, { main: component });
        });
      },
    },
  ],
});
export default routes;
