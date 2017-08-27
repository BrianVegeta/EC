// import { injectReducer } from 'reducers';
import { publishGoodsRouter as router } from 'lib/paths';

// const key = 'publish';
const path = router.aboutPath();
export default () => ({
  path,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../containers/StepAboutContainer').default;

      cb(null, Container);
    }, 'publish.goods.about');
  },
});
