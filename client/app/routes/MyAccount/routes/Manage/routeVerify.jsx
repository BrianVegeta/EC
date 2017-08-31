import { injectReducer } from 'reducers';
import { my } from 'lib/paths';


const { manageVerifyPath } = my;
export default store => ({
  path: manageVerifyPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/ManageVerifyContainer').default;
      const {
        default: reducer,
        REDUCER_KEY: key,
      } = require('../../modules/myManageVerify');
      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'my.manage.verify');
  },
});
