import { injectReducer } from 'reducers';
import { omit } from 'lodash';

import routeStep1Cover from './routes/routeStep1Cover';

const key = 'publish';
export default store => ({
  path: '/p/publish-service',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/PublishServiceContainer').default;
      const reducer = require('./modules/publish').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'publish.service');
  },

  indexRoute: omit(routeStep1Cover(store), ['path']),

  childRoutes: [
    routeStep1Cover(store),
  ],
});
