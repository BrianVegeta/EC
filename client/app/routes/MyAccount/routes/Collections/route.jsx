import { injectReducer } from 'reducers';
import { my } from 'lib/paths';

const key = 'myCollections';
export default store => ({
  path: my.collectionPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/CollectionsContainer').default;
      const reducer = require('../../modules/myCollection').default;
      injectReducer(store, { key, reducer });
      cb(null, Container);
    }, 'my.collections');
  },
});
