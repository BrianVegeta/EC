import {
  getCoverComponent,
  getAboutComponent,
} from './children';

export default routesHelper => ({
  path: routesHelper.release,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        mainComponent: require('./Container').default,
      });
    }, 'itemRelease');
  },
  indexRoute: getCoverComponent,
  childRoutes: [
    getAboutComponent(),
  ],
  onLeave: () => {
    console.log('on leave');
  },
});
