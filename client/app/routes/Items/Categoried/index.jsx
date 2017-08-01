import { fetchItems } from 'actions/itemsActions';

export default (routesHelper, dispatch) => ({
  path: `${routesHelper.items.root}/:name-c.:id`,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        main: require('./Container').default,
      });
    });
  },
  onEnter: () => {
    dispatch(fetchItems());
  },
});
