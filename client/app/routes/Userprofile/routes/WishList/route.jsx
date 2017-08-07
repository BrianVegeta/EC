export default store => ({
  path: 'items-goods',
  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Userprofile = require('./containers/UserprofileContainer').default;
      const reducer = require('./modules/userprofile').default;

      injectReducer(store, { key: 'userprofile', reducer });

      cb(null, Userprofile);
    }, 'userprofile');
  },
});
