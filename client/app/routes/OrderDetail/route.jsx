import { injectReducer } from 'reducers';
import { orderDetail } from 'lib/paths';

export default store => ({
  path: orderDetail.indexPath(':cid'),

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/OrderdetailContainer').default;
      const detailreducer = require('./modules/orderdetail').default;
      injectReducer(store, { key: 'orderdetail', reducer: detailreducer });
      cb(null, Container);
    }, 'orderdetail');
  },
});
