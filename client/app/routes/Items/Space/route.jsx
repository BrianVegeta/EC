export default ({ onEnter }) => ({
  path: '/p/i/space',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const component = require('./Container').default;
      callback(null, { main: component });
    });
  },
  onEnter,
});
