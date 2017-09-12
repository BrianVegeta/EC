export default store => ({
  path: '/p/sevenEleven',
  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./index.jsx').default;
      cb(null, Container);
    }, 'seven-eleven');
  },
});
