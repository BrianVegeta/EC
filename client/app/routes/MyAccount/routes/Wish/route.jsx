import { injectReducer } from 'reducers';
import { my } from 'lib/paths';

const key = 'myWish';
export default store => ({
  path: my.wishPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/WishContainer').default;
      const reducer = require('../../modules/myWish').default;
      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'my.wish');
  },
});
