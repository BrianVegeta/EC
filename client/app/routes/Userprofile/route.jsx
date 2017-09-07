import { injectReducer } from 'reducers';
import { omit } from 'lodash';

import routeItemsGoods from './routes/ItemsGoods/route';
import routeItemsService from './routes/ItemsService/route';
import routeItemsSpace from './routes/ItemsSpace/route';
import routeCommentsLessee from './routes/CommentsLessee/route';
import routeCommentsOwner from './routes/CommentsOwner/route';
import routeWishList from './routes/WishList/route';
import routeFans from './routes/Fans/route';
import routeTrack from './routes/Track/route';

const key = 'userprofile';
export default store => ({
  path: '/p/userprofile/:uid',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Userprofile = require('./containers/UserprofileContainer').default;
      const reducer = require('./modules/userprofile').default;

      injectReducer(store, { key, reducer });

      cb(null, Userprofile);
    }, 'userprofile');
  },

  indexRoute: omit(routeItemsGoods(store), ['path']),

  childRoutes: [
    routeItemsGoods(store),
    routeItemsService(store),
    routeItemsSpace(store),
    routeCommentsLessee(store),
    routeCommentsOwner(store),
    routeWishList(store),
    routeFans(store),
    routeTrack(store),
  ],
});
