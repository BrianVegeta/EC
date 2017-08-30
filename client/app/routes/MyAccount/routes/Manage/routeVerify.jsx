import { my } from 'lib/paths';


const { manageVerifyPath } = my;
export default () => ({
  path: manageVerifyPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/ManageVerifyContainer').default;

      cb(null, Container);
    }, 'my.manage.verify');
  },
});
