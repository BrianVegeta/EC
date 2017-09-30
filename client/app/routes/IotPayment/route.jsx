
// import { omit } from 'lodash';

import routePaymentLogin from './routes/PaymentLogin/route';
import routePaymendDetail from './routes/PaymentDetail/route';

export default store => ({
  path: '/p/iot/payment',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/PaymentContainer').default;

      cb(null, Container);
    }, 'iot.payment');
  },
  childRoutes: [
    routePaymentLogin(store),
    routePaymendDetail(store),
  ],
});
