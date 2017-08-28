// import { injectReducer } from 'reducers';
import { publishGoodsRouter as router } from 'lib/paths';

const path = router.confirmPath();
export default () => ({
  path,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../containers/StepConfirmContainer').default;

      cb(null, Container);
    }, 'publish.goods.confirm');
  },
});
