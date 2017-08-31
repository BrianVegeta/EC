import { injectReducer } from 'reducers';
import { forgotPasswordPath } from 'lib/paths';


export default store => ({
  path: forgotPasswordPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/ForgotPasswordContainer').default;
      const {
        default: reducer,
        REDUCER_KEY: FORGOT_PASSWORD_REDUCER_KEY,
      } = require('./modules/forgotPassword');

      injectReducer(store, { key: FORGOT_PASSWORD_REDUCER_KEY, reducer });
      cb(null, Container);
    }, 'forgot-password');
  },
});
