import { injectReducer } from 'reducers';

// const key = 'publish';
export default store => ({
  path: '/p/publish-service',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../containers/Step1CoverContainer').default;
      const cropperReducer = require('../modules/cropper').default;
      const coversReducer = require('../modules/covers').default;

      injectReducer(store, { key: 'covers', reducer: coversReducer });
      injectReducer(store, { key: 'cropper', reducer: cropperReducer });

      cb(null, Container);
    }, 'publish.service');
  },
});
