export default (routesHelper, dispatch) => ({
  path: '/p/registration',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        mainComponent: require('./Container').default,
      });
    }, 'auth.login');
  },
});
