import { injectReducer } from 'reducers';

export default store => ({
  path: 'items-goods',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const ItemsGoods = require('../../containers/ItemsGoodsContainer').default;
      const reducer = require('../../modules/itemsGoods').default;

      injectReducer(store, { key: 'itemsGoods', reducer });

      cb(null, ItemsGoods);
    }, 'items-goods');
  },
});
