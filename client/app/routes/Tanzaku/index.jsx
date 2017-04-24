export default routesHelper => ({
  path: routesHelper.tanzaku,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        main: require('./Container').default,
      });
    }, 'tanzaku');
  },
});
