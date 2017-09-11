import { injectReducer } from 'reducers';
import { my } from 'lib/paths';

const key = 'myOrder';
export default store => ({
  path: my.lesseeOrderUsedItem(':tabName'),

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../../containers/LoUIContainer').default;
      const reducer = require('../../../modules/myOrder').default;
      injectReducer(store, { key, reducer });
      cb(null, Container);
    }, 'my.loui');
  },
});
