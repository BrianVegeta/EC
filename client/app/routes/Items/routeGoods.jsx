import { injectReducer } from 'reducers';
import {
  CATEGORY_GOODS,
} from 'constants/enums';

const key = 'items';
export default store => ({
  path: `/p/i/${CATEGORY_GOODS}`,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/GoodsContainer').default;
      const reducer = require('./modules/items').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'items.goods');
  },
});
