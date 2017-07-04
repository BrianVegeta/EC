export default (path, onEnter) => ({
  path,
  onEnter,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        formComponent: require('./Container').default,
      });
    }, 'rs-g-2');
  },
});
