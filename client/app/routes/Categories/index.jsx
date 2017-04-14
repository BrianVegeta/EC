import { fetchCategories } from '../../actions/itemsActions';

export default (routesHelper, dispatch) => ({
  path: routesHelper.categories,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        main: require('./Container').default,
      });
    });
  },
  onEnter: () => {
    dispatch(fetchCategories());
  },
});
