export default () => ({
  path: '/p/my_account',
  onEnter: () => {

  },
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, { main: require('./Container').default });
    }, 'my.acc');
  },
  indexRoute: {
    getComponent(_nextState, callback) {
      require.ensure([], (require) => {
        callback(null, { formComponent: require('./Items/Container').default });
      }, 'my.acc.items');
    },
  },
  childRoutes: [
    {
      path: 'items',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Items/Container').default });
        }, 'my.acc.items');
      },
    },
    {
      path: 'wishs',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Wishs/Container').default });
        }, 'my.acc.wishs');
      },
    },
    {
      path: 'collections',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Collections/Container').default });
        }, 'my.acc.collections');
      },
    },
  ],
});
