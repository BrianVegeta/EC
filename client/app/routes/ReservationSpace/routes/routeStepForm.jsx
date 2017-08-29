// import { injectReducer } from 'reducers';
import { reservationSpace as router } from 'lib/paths';

// const key = 'publish';
export default () => ({
  path: router.formPath(':pid'),

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../containers/StepFormContainer').default;

      cb(null, Container);
    }, 'reservation.space.form');
  },
});
