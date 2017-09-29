import { injectReducer } from 'reducers';
import { wishRouter } from 'lib/paths';
import {
  REDUCER_KEY as WISH_REDUCER_KEY,
} from './modules/wish';

export default store => ({
  path: wishRouter.detailPath(':id'),

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/WishDetailContainers').default;
      const wishReducer = require('./modules/wish').default;

      injectReducer(store, { key: WISH_REDUCER_KEY, reducer: wishReducer });
      cb(null, Container);
    }, 'wish-detail');
  },
});
