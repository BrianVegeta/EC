import { injectReducer } from 'reducers';

const key = 'userprofileItems';
export default store => ({
  path: 'items-service',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/ItemsServiceContainer').default;
      const reducer = require('../../modules/userprofileItems').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'userprofile.items.service');
  },
});
