import { my } from 'lib/paths';
import { injectReducer } from 'reducers';


const { managePasswordChangePath } = my;
export default store => ({
  path: managePasswordChangePath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/ManagePasswordChangeContainer').default;
      const {
        default: reducer,
        REDUCER_KEY: key,
      } = require('../../modules/myManagePasswordChange');
      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'my.manage.password-change');
  },
});
