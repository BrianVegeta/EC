import { publishGoodsRouter } from 'lib/paths';
import { injectReducer } from 'reducers';
import { omit } from 'lodash';
import { checkStepsRestart } from 'modules/routingHelper';

import { REDUCER_KEY as PUBLISH_REDUCER_KEY } from './modules/publish';
import { REDUCER_KEY as COVERS_REDUCER_KEY } from './modules/covers';

import routeStepCover from './routes/routeStepCover';
import routeStepAbout from './routes/routeStepAbout';
import routeStepDelivery from './routes/routeStepDelivery';
import routeStepPrice from './routes/routeStepPrice';
import routeStepRegulation from './routes/routeStepRegulation';
import routeStepConfirm from './routes/routeStepConfirm';


const path = publishGoodsRouter.indexPath();
export default store => ({
  path,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/PublishGoodsContainer').default;
      const publishReducer = require('./modules/publish').default;
      const coversReducer = require('./modules/covers').default;

      injectReducer(store, { key: PUBLISH_REDUCER_KEY, reducer: publishReducer });
      injectReducer(store, { key: COVERS_REDUCER_KEY, reducer: coversReducer });

      cb(null, Container);
    }, 'publish.goods');
  },

  indexRoute: omit(routeStepCover(store), ['path']),

  onEnter: ({ location: { query } }) => {
    const { pid } = query;
    const stepStartPath = publishGoodsRouter.indexPath(pid);
    store.dispatch(checkStepsRestart(stepStartPath));
  },

  childRoutes: [
    routeStepCover(store),
    routeStepAbout(store),
    routeStepDelivery(store),
    routeStepPrice(store),
    routeStepRegulation(store),
    routeStepConfirm(store),
  ],
});
