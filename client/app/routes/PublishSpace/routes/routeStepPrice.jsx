import { publishSpaceRouter as router } from 'lib/paths';


const path = router.pricePath();
export default () => ({
  path,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../containers/StepPriceContainer').default;

      cb(null, Container);
    }, 'publish.space.price');
  },
});
