import { injectReducer } from 'reducers';
import {
  CATEGORY_SERVICE,
} from 'constants/enums';

const key = 'items';
export default store => ({
  path: `/p/i/${CATEGORY_SERVICE}`,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/ServiceContainer').default;
      const reducer = require('./modules/items').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'items.service');
  },
});
