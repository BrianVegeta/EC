// import { injectReducer } from 'reducers';
import { reservationSpace as router } from 'lib/paths';

// const key = 'publish';
export default () => ({
  path: router.paymentPath(':pid'),

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../containers/StepPaymentContainer').default;

      cb(null, Container);
    }, 'reservation.space.payment');
  },
});
