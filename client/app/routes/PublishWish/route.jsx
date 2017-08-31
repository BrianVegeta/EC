import { publishWishRouter } from 'lib/paths';
import { injectReducer } from 'reducers';


const path = publishWishRouter.indexPath();
export default store => ({
  path,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/PublishWishContainer').default;
      const {
        default: publishReducer,
        REDUCER_KEY: PUBLISH_REDUCER_KEY,
      } = require('./modules/publish');
      const {
        default: avatarReducer,
        REDUCER_KEY: CROPPER_REDUCER_KEY,
      } = require('./modules/avatarCropper');

      injectReducer(store, { key: PUBLISH_REDUCER_KEY, reducer: publishReducer });
      injectReducer(store, { key: CROPPER_REDUCER_KEY, reducer: avatarReducer });
      cb(null, Container);
    }, 'publish.wish');
  },
});
