export default () => ({
  path: '/p/test',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        children: require('./Container').default,
      });
    }, 'test');
  },
});
