import { injectReducer } from 'reducers';
import { loginPath } from 'lib/paths';
import { REDUCER_KEY as LOGIN_REDUCER_KEY } from './modules/login';

export default store => ({
  path: loginPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/LoginContainer').default;
      const reducer = require('./modules/login').default;

      injectReducer(store, { key: LOGIN_REDUCER_KEY, reducer });
      cb(null, Container);
    }, 'login');
  },
});
