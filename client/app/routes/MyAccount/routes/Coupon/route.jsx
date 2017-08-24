import { injectReducer } from 'reducers';
import { my } from 'lib/paths';

const key = 'myCoupon';
export default store => ({
  path: my.couponPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/CouponContainer').default;
      const reducer = require('../../modules/myCoupon').default;
      injectReducer(store, { key, reducer });
      cb(null, Container);
    }, 'my.coupon');
  },
});
