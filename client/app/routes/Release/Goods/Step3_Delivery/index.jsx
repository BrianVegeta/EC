export default () => ({
  path: 's3_d',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const formComponent = require('./Container').default;
      callback(null, { formComponent });
    });
  },
});
