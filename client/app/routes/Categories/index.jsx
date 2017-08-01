export default routesHelper => ({
  path: routesHelper.categories,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        main: require('./Container').default,
      });
    });
  },
});
