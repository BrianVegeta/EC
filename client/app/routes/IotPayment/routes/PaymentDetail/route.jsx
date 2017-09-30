// import { injectReducer } from 'reducers';
import { iotPayment } from 'lib/paths';

const path = iotPayment.detailPath;
export default () => ({
  path,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      console.log('check1');
      const Container = require('../../containers/PaymentDetailContainer').default;
      cb(null, Container);
    }, 'iot.payment.detail');
  },
});
