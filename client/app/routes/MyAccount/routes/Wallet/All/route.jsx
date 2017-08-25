import { injectReducer } from 'reducers';
import { my } from 'lib/paths';

const key = 'myWallet';
export default store => ({
  path: my.walletPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../../containers/WalletAllContainer').default;
      const reducer = require('../../../modules/myWallet').default;
      injectReducer(store, { key, reducer });
      cb(null, Container);
    }, 'my.wallet.out');
  },
});
