import { injectReducer } from 'reducers';

const key = 'items';
export default store => ({
  path: '/p/i/:name-c.:cid.:type',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/CategoryContainer').default;
      const reducer = require('./modules/items').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'items.category');
  },
});
