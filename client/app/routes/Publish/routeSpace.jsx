import { injectReducer } from 'reducers';
import { omit } from 'lodash';

import routeStep1 from './routes/Space/routeStep1_Cover';

const key = 'publish';
export default store => ({
  path: '/p/publish-space',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SpaceContainer').default;
      const reducer = require('./modules/publish').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'publish');
  },
  //
  // indexRoute: omit(routeItemsGoods(store), ['path']),
  //
  // childRoutes: [
  //   routeItemsGoods(store),
  //   routeItemsService(store),
  //   routeItemsSpace(store),
  //   routeCommentsLessee(store),
  //   routeCommentsOwner(store),
  //   routeWishList(store),
  // ],
});
