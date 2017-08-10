import { injectReducer } from 'reducers';

const key = 'myCollections';
export default store => ({
  path: 'collections',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      console.log('mycollections');
      const Container = require('../../containers/CollectionsContainer').default;
      const reducer = require('../../modules/myCollection').default;
      injectReducer(store, { key, reducer });
      cb(null, Container);
    }, 'my.collections');
  },
});
