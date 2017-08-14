import { injectReducer } from 'reducers';
import { my } from 'lib/paths';

const key = 'myOrder';
export default store => ({
  path: my.ownerOrderItem(':tabName'),

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      console.log('hereA');
      const Container = require('../../../containers/OoItContainer').default;
      const reducer = require('../../../modules/myOrder').default;
      injectReducer(store, { key, reducer });
      cb(null, Container);
    }, 'my.ooit');
  },
});
