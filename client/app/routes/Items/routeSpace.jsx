import { injectReducer } from 'reducers';
import {
  CATEGORY_SPACE,
} from 'constants/enums';

const key = 'items';
export default store => ({
  path: `/p/i/${CATEGORY_SPACE}`,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SpaceContainer').default;
      const reducer = require('./modules/items').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'items.space');
  },
});
