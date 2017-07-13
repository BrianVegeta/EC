import {
  getAndChangeBankInfo,
} from 'actions/secrecyVerificationActions';

import Step1FormRoute from './Step1_Form/route';
import Step2PaymentRoute from './Step2_Payment/route';
import Step3Confirm from './Step3_Confirm/route';


export default (onEnter, dispatch) => ({
  onEnter,
  path: '/p/reservation-goods/:pid',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        main: require('./Container').default,
      });
    }, 'reservation.goods');
  },
  indexRoute: Step1FormRoute(null, null),
  childRoutes: [
    Step2PaymentRoute(
      's2_p',
      () => {
        // API 取得銀行資訊
        dispatch(getAndChangeBankInfo());
      },
    ),
    Step3Confirm('s3_c', null),
  ],
});
