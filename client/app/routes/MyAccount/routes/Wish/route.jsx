import { injectReducer } from 'reducers';

const key = 'myWish';
export default store => ({
  path: 'wish',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/WishContainer').default;
      const reducer = require('../../modules/myWish').default;
      console.log('enter route');
      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'my.wish');
  },
});
