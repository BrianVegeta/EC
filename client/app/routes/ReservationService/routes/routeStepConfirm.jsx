// import { injectReducer } from 'reducers';
import { reservationService as router } from 'lib/paths';

// const key = 'publish';
export default () => ({
  path: router.confirmPath(':pid'),

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../containers/StepConfirmContainer').default;

      cb(null, Container);
    }, 'reservation.service.confirm');
  },
});
