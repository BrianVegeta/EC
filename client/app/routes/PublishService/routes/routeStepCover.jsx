import { injectReducer } from 'reducers';
import { publishServiceRouter as router } from 'lib/paths';

const path = router.coverPath();
export default store => ({
  path,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../containers/StepCoverContainer').default;
      const {
        default: cropperReducer,
        REDUCER_KEY: CROPPER_REDUCER_KEY,
      } = require('../modules/cropper');
      // const {
      //   default: coversReducer,
      //   REDUCER_KEY: COVERS_REDUCER_KEY,
      // } = require('../modules/covers');

      injectReducer(store, { key: CROPPER_REDUCER_KEY, reducer: cropperReducer });
      // injectReducer(store, { key: COVERS_REDUCER_KEY, reducer: coversReducer });

      cb(null, Container);
    }, 'publish.service.cover');
  },
});
