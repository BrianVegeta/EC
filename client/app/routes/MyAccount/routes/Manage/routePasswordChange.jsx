import { my } from 'lib/paths';


const { managePasswordChangePath } = my;
export default () => ({
  path: managePasswordChangePath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/ManagePasswordChangeContainer').default;

      cb(null, Container);
    }, 'my.manage.password-change');
  },
});
