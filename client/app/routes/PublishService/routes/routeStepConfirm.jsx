// import { injectReducer } from 'reducers';
import { publishService as router } from 'lib/paths';

// const key = 'publish';
export default () => ({
  path: router.confirmPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../containers/StepConfirmContainer').default;
      // const cropperReducer = require('../modules/cropper').default;
      // const coversReducer = require('../modules/covers').default;

      // injectReducer(store, { key: 'covers', reducer: coversReducer });
      // injectReducer(store, { key: 'cropper', reducer: cropperReducer });

      cb(null, Container);
    }, 'publish.service.confirm');
  },
});