// import { fetchCollections } from 'connector/myCollections/actions';
// import { fetchCoupons } from 'connector/myCoupon/actions';
// import { fetchComments, TYPE_OWNER } from 'connector/comment/actions';
import { omit } from 'lodash';
import routeMyItem from './routes/Item/route'
import routeMyCollection from './routes/Collections/route';
import routeMyCoupon from './routes/Coupon/route';
import routeMyWishList from './routes/Wish/route';
import routeMyOwnerComment from './routes/CommentOwner/route';
import routeMyLesseeComment from './routes/CommentLessee/route';

export default store => ({
  path: '/p/my',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const MyAccount = require('./containers/MyAccountContainer').default;
      cb(null, MyAccount);
    }, 'my.acc');
  },

  indexRoute: omit(routeMyItem(store), ['path']),

  childRoutes: [
    routeMyItem(store),
    routeMyCollection(store),
    routeMyCoupon(store),
    routeMyOwnerComment(store),
    routeMyLesseeComment(store),
    routeMyWishList(store),
  ],
  /*
  childRoutes: [
    {
      path: 'items',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Items/Container').default });
        }, 'my.acc.items');
      },
    },
    {
      path: 'wishs',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Wishs/Container').default });
        }, 'my.acc.wishs');
      },
    },
    {
      path: 'wallet',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Wallet/Container').default });
        }, 'my.acc.wallet');
      },
    },

    {
      path: 'coupons',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Coupons/Container').default });
        }, 'my.acc.coupons');
      },
      onEnter: () => {
        // dispatch(fetchCoupons());
      },
    },
    {
      path: 'comments',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Comments/Container').default });
        }, 'my.acc.comments');
      },
      onEnter: () => {
        // dispatch(fetchComments(TYPE_OWNER));
      },
    },
  ],*/
});
