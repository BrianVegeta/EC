import Layout from '../containers/LayoutContainer';
import { fetchCategories, fetchItems } from '../actions/itemsActions';

const routes = (routesHelper, dispatch) => ({
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
      onEnter: () => {
        dispatch(fetchItems());
        dispatch(fetchCategories());
      },
    },
    {
      path: '/p/i/service',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          const component = require('../containers/ServiceContainer').default;
          callback(null, { main: component });
        });
      },
      onEnter: () => {
        dispatch(fetchItems());
        dispatch(fetchCategories());
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
      onEnter: () => {
        dispatch(fetchItems());
        dispatch(fetchCategories());
      },
    },
    {
      path: 'p/i/:name-c.:id',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, {
            main: require('../containers/CategoriedItemsContainer').default,
          });
        });
      },
      onEnter: () => {
        dispatch(fetchItems());
        dispatch(fetchCategories());
      },
    },
  ],
});
export default routes;
