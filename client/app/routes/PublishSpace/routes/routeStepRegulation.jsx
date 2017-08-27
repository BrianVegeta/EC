// import { injectReducer } from 'reducers';
import { publishSpaceRouter as router } from 'lib/paths';

// const key = 'publish';
const path = router.regulationPath();
export default () => ({
  path,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../containers/StepRegulationContainer').default;

      cb(null, Container);
    }, 'publish.space.regulation');
  },
});
