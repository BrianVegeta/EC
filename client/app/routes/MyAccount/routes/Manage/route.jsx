import { omit } from 'lodash';
import { my } from 'lib/paths';
import routePasswordChange from './routePasswordChange';
import routeVerify from './routeVerify';


const { managePath } = my;
export default store => ({
  path: managePath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/ManageContainer').default;

      cb(null, Container);
    }, 'my.manage');
  },

  indexRoute: omit(routeVerify(store), ['path']),

  childRoutes: [
    routePasswordChange(store),
    routeVerify(store),
  ],
});
