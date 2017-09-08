import { injectReducer } from 'reducers';
import { items } from 'lib/paths';

const key = 'items';
const PATH = items.usedGoodsPath;
export default store => ({
  path: PATH,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/UsedGoodsContainer').default;
      const reducer = require('./modules/items').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'items.goods');
  },
});
