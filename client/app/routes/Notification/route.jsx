import { omit } from 'lodash';
import routeActivity from './routes/NotifyActivity/route';
import routeContract from './routes/NotifyContract/route';
import routeSystem from './routes/NotifySystem/route';
import routeItem from './routes/NotifyItem/route';

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
    routeItem(store),
    routeContract(store),
    routeSystem(store),
  ],
});
