import { injectReducer } from 'reducers';

const key = 'myWallet';
export default store => ({
  path: 'wallet-all',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../../containers/WalletAllContainer').default;
      const reducer = require('../../../modules/myWallet').default;
      injectReducer(store, { key, reducer });
      cb(null, Container);
    }, 'my.wallet.out');
  },
});
