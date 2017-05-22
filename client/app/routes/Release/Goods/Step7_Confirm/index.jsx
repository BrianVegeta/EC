export default () => ({
  path: 's7_c',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const formComponent = require('./Container').default;
      callback(null, { formComponent });
    });
  },
});
