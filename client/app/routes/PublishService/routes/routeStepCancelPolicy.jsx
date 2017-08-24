// import { injectReducer } from 'reducers';
import { publishServiceRouter as router } from 'lib/paths';

const path = router.cancelPolicyPath();
export default () => ({
  path,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../containers/StepCancelPolicyContainer').default;

      cb(null, Container);
    }, 'publish.service.cancelPolicy');
  },
});
