export default () => ({
  path: 's6_cp',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const formComponent = require('./Container').default;
      callback(null, { formComponent });
    });
  },
});
