import { injectReducer, removeReducer } from 'reducers';
import { fetchOrder } from './modules/orderdetail';

const key = 'orderdetail';
export default store => ({
  path: '/p/order_detail/:cid',

  onEnter: (nextState) => {
    const { cid } = nextState.params;
    store.dispatch(fetchOrder(cid));
  },

  onLeave: () => {
    removeReducer(store, { key });
  },

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Orderdetail = require('./containers/OrderdetailContainer').default;
      const reducer = require('./modules/orderdetail').default;

      injectReducer(store, { key, reducer });

      cb(null, Orderdetail);
    }, 'orderdetail');
  },
});
