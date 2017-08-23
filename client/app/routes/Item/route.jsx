import { injectReducer } from 'reducers';
import { itemPath } from 'lib/paths';
import {
  REDUCER_KEY as ITEM_REDUCER_KEY,
} from './modules/item';

export default store => ({
  path: itemPath(':name', ':pid', false),

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/Container').default;
      const itemReducer = require('./modules/item').default;
      const messageReducer = require('./modules/messageboard').default;

      injectReducer(store, { key: ITEM_REDUCER_KEY, reducer: itemReducer });
      injectReducer(store, { key: 'messageboard', reducer: messageReducer });
      cb(null, Container);
    }, 'item');
  },
});
