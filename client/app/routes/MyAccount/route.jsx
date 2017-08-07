// import { fetchCollections } from 'connector/myCollections/actions';
import { fetchCoupons } from 'connector/myCoupon/actions';
// import { fetchComments, TYPE_OWNER } from 'connector/comment/actions';

export default ({ dispatch }) => ({
  path: '/p/my_account',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, { main: require('./Container').default });
    }, 'my.acc');
  },
  indexRoute: {
    getComponent(_nextState, callback) {
      require.ensure([], (require) => {
        callback(null, { formComponent: require('./Items/Container').default });
      }, 'my.acc.items');
    },
  },
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
      path: 'collections',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Collections/Container').default });
        }, 'my.acc.collections');
      },
      onEnter: () => {
        // dispatch(fetchCollections());
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
  ],
});
