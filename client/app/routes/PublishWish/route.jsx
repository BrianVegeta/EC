import { publishWishRouter } from 'lib/paths';
import { injectReducer } from 'reducers';

import { REDUCER_KEY as PUBLISH_REDUCER_KEY } from './modules/publish';
import { REDUCER_KEY as COVERS_REDUCER_KEY } from './modules/avatarCropper';

const path = publishWishRouter.indexPath();
export default store => ({
  path,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/PublishWishContainer').default;
      const publishReducer = require('./modules/publish').default;
      const avatarReducer = require('./modules/avatarCropper').default;

      injectReducer(store, { key: PUBLISH_REDUCER_KEY, reducer: publishReducer });
      injectReducer(store, { key: COVERS_REDUCER_KEY, reducer: avatarReducer });
      cb(null, Container);
    }, 'publish.wish');
  },
});
