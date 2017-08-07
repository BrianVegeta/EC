import { injectReducer, removeReducer } from 'reducers';
import { fetchItems, reset } from 'actions/itemsActions';
import {
  CATEGORY_GOODS,
  CATEGORY_GOODS_ID,
} from 'constants/enums';

const key = 'itemlist';
export default store => ({
  path: `/p/i/${CATEGORY_GOODS}`,

  onEnter: () => {
    console.log('onEnter');
    store.dispatch(fetchItems(CATEGORY_GOODS_ID));
  },

  onLeave: () => {
    console.log('rrrremove');
    store.dispatch(reset());
    removeReducer(store, { key });
  },

  getComponent(_nextState, cb) {
    console.log('getComponent');
    require.ensure([], (require) => {
      const main = require('./containers/ItemsGoodsContainer').default;
      const reducer = require('actions/itemsActions').default;

      injectReducer(store, { key, reducer });
      cb(null, { main });
    }, 'itemlistgoods');
  },
});
