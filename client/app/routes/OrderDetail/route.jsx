import { injectReducer } from 'reducers';
import { fetchOrder } from './modules/orderdetail';

export default store => ({
  path: '/p/order_detail/:cid',
  onEnter: (nextState) => {
    console.log(nextState);
    const { cid } = nextState.params;
    store.dispatch(fetchOrder(cid));
  },
  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Orderdetail = require('./containers/OrderdetailContainer').default;
      const reducer = require('./modules/orderdetail').default;

      injectReducer(store, { key: 'orderdetail', reducer });

      cb(null, Orderdetail);
    }, 'orderdetail');
  },
});
