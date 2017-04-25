export default routesHelper => ({
  path: routesHelper.release,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        main: require('./Container').default,
      });
    }, 'itemRelease');
  },
});
