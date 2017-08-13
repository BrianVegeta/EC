import { injectReducer } from 'reducers';
import { publishService as router } from 'lib/paths';

export default store => ({
  path: router.coverPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../containers/StepCoverContainer').default;
      const cropperReducer = require('../modules/cropper').default;
      const coversReducer = require('../modules/covers').default;

      injectReducer(store, { key: 'covers', reducer: coversReducer });
      injectReducer(store, { key: 'cropper', reducer: cropperReducer });

      cb(null, Container);
    }, 'publish.service.cover');
  },
});
