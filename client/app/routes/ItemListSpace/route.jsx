import { injectReducer, removeReducer } from 'reducers';
import { fetchItems, reset } from 'actions/itemsActions';
import {
  CATEGORY_SERVICE,
  CATEGORY_SERVICE_ID,
} from 'constants/enums';

const key = 'itemlistspace';
export default store => ({
  path: `/p/i/${CATEGORY_SERVICE}`,

  onEnter: () => {
    store.dispatch(fetchItems(CATEGORY_SERVICE_ID));
  },

  onLeave: () => {
    store.dispatch(reset());
    removeReducer(store, { key });
  },

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const defaultContainer = require('./containers/ItemsSpaceContainer').default;
      const reducer = require('actions/itemsActions').default;
      injectReducer(store, { key, reducer });
      cb(null, {
        main: defaultContainer,
      });
    }, key);
  },
});
