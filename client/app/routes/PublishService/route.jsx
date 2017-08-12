import { publishService as router } from 'lib/paths';
import { injectReducer } from 'reducers';
import { omit } from 'lodash';

import routeStepCover from './routes/routeStepCover';
import routeStepAbout from './routes/routeStepAbout';
import routeStepDelivery from './routes/routeStepDelivery';
import routeStepPrice from './routes/routeStepPrice';
import routeStepRegulation from './routes/routeStepRegulation';
import routeStepCancelPolicy from './routes/routeStepCancelPolicy';
import routeStepConfirm from './routes/routeStepConfirm';

const key = 'publish';
export default store => ({
  path: router.indexPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/PublishServiceContainer').default;
      const reducer = require('./modules/publish').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'publish.service');
  },

  indexRoute: omit(routeStepCover(store), ['path']),

  childRoutes: [
    routeStepCover(store),
    routeStepAbout(store),
    routeStepDelivery(store),
    routeStepPrice(store),
    routeStepRegulation(store),
    routeStepConfirm(store),
    routeStepCancelPolicy(store),
  ],
});
