import { injectReducer } from 'reducers';

const key = 'myItem';
export default store => ({
  path: 'item',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/ItemContainer').default;
      const reducer = require('../../modules/myItem').default;
      injectReducer(store, { key, reducer });
      cb(null, Container);
    }, 'my.item');
  },
});
