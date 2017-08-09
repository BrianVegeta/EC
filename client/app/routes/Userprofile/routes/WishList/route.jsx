import { injectReducer } from 'reducers';

const key = 'userprofileWishList';
export default store => ({
  path: 'wish-list',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/WishListContainer').default;
      const reducer = require('../../modules/userprofileWishList').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'userprofile.wish-list');
  },
});
