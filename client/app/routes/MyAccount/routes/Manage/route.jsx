import { omit } from 'lodash';
import { injectReducer } from 'reducers';
import { my } from 'lib/paths';
import routePasswordChange from './routePasswordChange';
import routeVerify from './routeVerify';


const { managePath } = my;
export default store => ({
  path: managePath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/ManageContainer').default;
      const {
        default: reducer,
        REDUCER_KEY: key,
      } = require('../../modules/myManage');
      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'my.manage');
  },

  indexRoute: omit(routeVerify(store), ['path']),

  childRoutes: [
    routePasswordChange(store),
    routeVerify(store),
  ],
});
