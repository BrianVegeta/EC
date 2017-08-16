import { injectReducer } from 'reducers';

export default store => ({
  path: '/p/order_detail/:cid',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/OrderdetailContainer').default;
      const detailreducer = require('./modules/orderdetail').default;
      const actionReducer = require('./modules/orderaction').default;
      injectReducer(store, { key: 'orderaction', reducer: actionReducer });
      injectReducer(store, { key: 'orderdetail', reducer: detailreducer });
      cb(null, Container);
    }, 'orderdetail');
  },
});
