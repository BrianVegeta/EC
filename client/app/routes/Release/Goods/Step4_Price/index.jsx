export default () => ({
  path: 's4_p',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const formComponent = require('./Container').default;
      callback(null, { formComponent });
    });
  },
  childRoutes: [
    {
      path: 'd_c',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          const modalComponent = require('./DiscountNew/Container').default;
          callback(null, { modalComponent });
        }, 'd_c');
      },
    },
  ],
});
