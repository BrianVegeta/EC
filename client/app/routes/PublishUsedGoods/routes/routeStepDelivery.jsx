import { publishUsedGoodsRouter as router } from 'lib/paths';

const path = router.deliveryPath();
export default () => ({
  path,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../containers/StepDeliveryContainer').default;

      cb(null, Container);
    }, 'publish.goods.delivery');
  },
});
