export default (routesHelper, dispatch) => ({
  path: '/p/login',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        main: require('./Container').default,
      });
    }, 'auth.login');
  },
});
