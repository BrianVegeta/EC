export default (routesHelper, dispatch) => ({
  path: '/p/registration',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        main: require('./Container').default,
      });
    }, 'auth.registration');
  },
});
