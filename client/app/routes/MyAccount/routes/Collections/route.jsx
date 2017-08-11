import { injectReducer } from 'reducers';

const key = 'myCollections';
export default store => ({
  path: 'collections',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/ItemContainer').default;
      const reducer = require('../../modules/myCollection').default;
      injectReducer(store, { key, reducer });
      cb(null, Container);
    }, 'my.collections');
  },
});
