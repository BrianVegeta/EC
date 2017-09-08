import { injectReducer } from 'reducers';
import { publishUsedGoodsRouter as router } from 'lib/paths';

const path = router.coverPath();
export default store => ({
  path,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../containers/StepCoverContainer').default;
      const cropperReducer = require('../modules/cropper').default;
      const coversReducer = require('../modules/covers').default;

      injectReducer(store, { key: 'covers', reducer: coversReducer });
      injectReducer(store, { key: 'cropper', reducer: cropperReducer });

      cb(null, Container);
    }, 'publish.goods.cover');
  },
});
