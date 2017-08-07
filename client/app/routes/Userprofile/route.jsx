import { injectReducer } from 'reducers';
import { fetchUser } from './modules/userprofile';

export default store => ({
  path: '/p/userprofile/:uid',
  onEnter: (nextState) => {
    const { uid } = nextState.params;
    store.dispatch(fetchUser(uid));
  },
  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Userprofile = require('./containers/UserprofileContainer').default;
      const reducer = require('./modules/userprofile').default;

      injectReducer(store, { key: 'userprofile', reducer });

      cb(null, Userprofile);
    }, 'userprofile');
  },
});
