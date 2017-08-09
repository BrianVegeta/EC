import { injectReducer } from 'reducers';

const key = 'userprofileItems';
export default store => ({
  path: 'items-goods',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/ItemsGoodsContainer').default;
      const reducer = require('../../modules/userprofileItems').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'userprofile.items.goods');
  },
});
