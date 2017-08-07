import { injectReducer, removeReducer } from 'reducers';
import { fetchUser } from './modules/userprofile';
import routeItemsGoods from './routes/ItemsGoods/route';

const key = 'userprofile';
export default store => ({
  path: '/p/userprofile/:uid',

  onEnter: (nextState) => {
    const { uid } = nextState.params;
    store.dispatch(fetchUser(uid));
  },

  onLeave: () => {
    removeReducer(store, { key });
  },

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Userprofile = require('./containers/UserprofileContainer').default;
      const reducer = require('./modules/userprofile').default;

      injectReducer(store, { key, reducer });

      cb(null, Userprofile);
    }, 'userprofile');
  },

  childRoutes: [
    routeItemsGoods(store),
  ],
});
