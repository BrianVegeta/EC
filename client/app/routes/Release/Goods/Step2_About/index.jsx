import { fetchCategories } from '../../../../actions/itemsActions';

export default dispatch => ({
  path: 's2_a',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const formComponent = require('./Container').default;
      callback(null, { formComponent });
    });
  },
  onEnter: () => {
    dispatch(fetchCategories());
  },
});
