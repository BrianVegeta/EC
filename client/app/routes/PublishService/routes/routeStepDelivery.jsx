// import { injectReducer } from 'reducers';
import { publishService as router } from 'lib/paths';

// const key = 'publish';
export default () => ({
  path: router.deliveryPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../containers/StepDeliveryContainer').default;
      // const cropperReducer = require('../modules/cropper').default;
      // const coversReducer = require('../modules/covers').default;

      // injectReducer(store, { key: 'publishCovers', reducer: coversReducer });
      // injectReducer(store, { key: 'cropper', reducer: cropperReducer });

      cb(null, Container);
    }, 'publish.service.delivery');
  },
});
