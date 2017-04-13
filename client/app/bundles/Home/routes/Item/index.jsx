export default routesHelper => ({
  path: `${routesHelper.item}/:name-i.:id`,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        main: require('./Container').default,
      });
    }, 'item');
  },
});
