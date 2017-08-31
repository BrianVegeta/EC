import { my as mineRouter } from 'lib/paths';


export default () => ({
  path: mineRouter.bankSetupPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/BankSetupContainer').default;

      cb(null, Container);
    }, 'my.bank-setup');
  },
});
