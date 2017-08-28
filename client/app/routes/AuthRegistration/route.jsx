import { injectReducer } from 'reducers';
import { registrationPath } from 'lib/paths';
import {
  REDUCER_KEY as REGISTRATION_REDUCER_KEY,
} from './modules/registration';

export default store => ({
  path: registrationPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/RegistrationContainer').default;
      const reducer = require('./modules/registration').default;

      injectReducer(store, { key: REGISTRATION_REDUCER_KEY, reducer });
      cb(null, Container);
    }, 'registration');
  },
});
