import { fetchCategories, fetchItems } from '../../../actions/itemsActions';

export default (routesHelper, dispatch) => ({
  path: `${routesHelper.items.root}/goods`,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const component = require('./Container').default;
      callback(null, { main: component });
    });
  },
  onEnter: () => {
    dispatch(fetchItems());
    dispatch(fetchCategories());
  },
});
