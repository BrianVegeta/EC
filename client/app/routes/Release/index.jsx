import {
  getCoverComponent,
  getAboutComponent,
  getDeliveryComponent,
  getPriceComponent,
  getRegulationComponent,
  getCancelPolicyComponent,
  getConfirmComponent,
} from './steps';

const getChildRoutes = dispatch => (
  [
    getAboutComponent(dispatch, 'step2'),
    getDeliveryComponent('step3'),
    getPriceComponent('step4'),
    getRegulationComponent('step5'),
    getCancelPolicyComponent('step6'),
    getConfirmComponent('step7'),
  ]
);
export default (routesHelper, dispatch) => ({
  path: routesHelper.release,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        mainComponent: require('./Container').default,
      });
    }, 'release.item');
  },
  indexRoute: getCoverComponent(dispatch),
  childRoutes: getChildRoutes(dispatch),
  onLeave: () => console.log('on leave'),
});
