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
      path: '/p/i/:name-c.:id',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          const component = require('../containers/GoodsContainer').default;
          callback(null, { main: component });
        });
      },
    },
    {
      path: '/p/i/:type',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          const component = require('../containers/GoodsContainer').default;
          callback(null, { main: component });
        });
      },
    },
  ],
});
export default routes;
