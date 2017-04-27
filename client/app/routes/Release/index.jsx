import {
  getCoverComponent,
  getAboutComponent,
} from './steps';

const getChildRoutes = dispatch => (
  [
    getAboutComponent(dispatch, 'step2'),
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
