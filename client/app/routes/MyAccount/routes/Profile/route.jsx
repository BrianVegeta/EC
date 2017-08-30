import { injectReducer } from 'reducers';
import { my } from 'lib/paths';


const { profilePath } = my;
export default store => ({
  path: profilePath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/ProfileContainer').default;
      const {
        default: reducer,
        REDUCER_KEY: key,
      } = require('../../modules/myProfile');
      injectReducer(store, { key, reducer });

      const {
        default: cropperReducer,
        REDUCER_KEY: cropperKey,
      } = require('../../modules/avatarCropper');
      injectReducer(store, { key: cropperKey, reducer: cropperReducer });

      cb(null, Container);
    }, 'my.profile');
  },
});
