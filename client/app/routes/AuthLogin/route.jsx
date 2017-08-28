import { loginPath } from 'lib/paths';

export default () => ({
  path: loginPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/LoginContainer').default;
      cb(null, Container);
    }, 'login');
  },
});
