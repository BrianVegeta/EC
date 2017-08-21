// import { fetchCollections } from 'connector/myCollections/actions';
// import { fetchCoupons } from 'connector/myCoupon/actions';
// import { fetchComments, TYPE_OWNER } from 'connector/comment/actions';
import { omit } from 'lodash';
import routeActivity from './routes/NotifyActivity/route'
import routeContract from './routes/NotifyContract/route';
import routeSystem from './routes/NotifySystem/route';

export default store => ({
  path: '/p/notify',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Notify = require('./containers/NotifyContainers').default;
      cb(null, Notify);
    }, 'notify.layout');
  },

  indexRoute: omit(routeContract(store), ['path']),

  childRoutes: [
    routeActivity(store),
    routeContract(store),
    routeSystem(store),
  ],
});
