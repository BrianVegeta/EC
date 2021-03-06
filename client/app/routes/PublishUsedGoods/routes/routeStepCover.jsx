import { injectReducer } from 'reducers';
import { publishUsedGoodsRouter as router } from 'lib/paths';

const path = router.coverPath();
export default store => ({
  path,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../containers/StepCoverContainer').default;
      const {
        default: cropperReducer,
        REDUCER_KEY: COVERS_REDUCER_KEY,
      } = require('../modules/cropper');

      injectReducer(store, { key: COVERS_REDUCER_KEY, reducer: cropperReducer });

      cb(null, Container);
    }, 'publish.goods.cover');
  },
});
