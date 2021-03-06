import { injectReducer } from 'reducers';
import { my } from 'lib/paths';

const key = 'myItem';
export default store => ({
  path: my.mySpacePath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../../containers/ItemSpaceContainer').default;
      const reducer = require('../../../modules/myItem').default;
      injectReducer(store, { key, reducer });
      cb(null, Container);
    }, 'my.space');
  },
});
