import { injectReducer } from 'reducers';

const key = 'userprofileItems';
export default store => ({
  path: 'items-space',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/ItemsSpaceContainer').default;
      const reducer = require('../../modules/userprofileItems').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'userprofile.items.space');
  },
});
