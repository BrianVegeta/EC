import Step1Cover from './Step1_Cover';
import { confirmLeavePage } from '../../../funcs/confirm';


export default (routesHelper, dispatch) => ({
  path: '/p/release-goods',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        mainComponent: require('./Container').default,
      });
    }, 'release.goods');
  },
  indexRoute: Step1Cover(dispatch),
  onEnter: () => {
    window.addEventListener('beforeunload', confirmLeavePage);
  },
});
