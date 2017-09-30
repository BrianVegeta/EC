// import { injectReducer } from 'reducers';
import { iotPayment } from 'lib/paths';

const path = iotPayment.loginPath;
export default () => ({
  path,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      console.log('check2');
      const Container = require('../../containers/PaymentLoginContainer').default;
      cb(null, Container);
    }, 'iot.payment.login');
  },
});
