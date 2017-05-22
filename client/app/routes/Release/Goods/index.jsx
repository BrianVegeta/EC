import Step1Cover from './Step1_Cover';
import Step2About from './Step2_About';
import Step3Delivery from './Step3_Delivery';
import Step4Price from './Step4_Price';
import Step5Regulation from './Step5_Regulation';
import Step6CancelPolicy from './Step6_CancelPolicy';
import Step7Confirm from './Step7_Confirm';
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
  childRoutes: [
    Step2About,
    Step3Delivery,
    Step4Price,
    Step5Regulation,
    Step6CancelPolicy,
    Step7Confirm,
  ],
});
