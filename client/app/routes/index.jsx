import layoutHoc from 'containers/layoutHoc';

import { editItem } from 'actions/itemActions';

import Fixed from 'layouts/Fixed';
import Home from 'layouts/Home';
import ItemDetail from 'layouts/ItemDetail';
import Mine from 'layouts/MyAccount';
import Publish from 'layouts/Publish';
import Signinup from 'layouts/Signinup';
import Ownerprofile from 'layouts/Ownerprofile';

import HomeRoute from './Home';
import GoodsRoute from './Items/Goods';
import itemsSpaceRoute from './Items/Space/route';
import itemsServiceRoute from './Items/Service/route';

import CategoriedRoute from './Items/Categoried';
import Categories from './Categories';
import ItemRoute from './Item';
import Tanzaku from './Tanzaku';
import ReleaseGoods from './Release/Goods';
import ReleaseService from './Release/Service';
import ReleaseSpace from './Release/Space';
import AuthLogin from './Auth/Login';
import Registration from './Auth/Registration';
import MyAccount from './MyAccount';
import ReservationGoods from './Reservation/Goods/route';
import OwnerprofileRoute from './Ownerprofile/route';
import TestLayout from './Test/Container';


const requireCates = true;
const requireAuth = true;
const confirmLeave = true;

export default (routesHelper, dispatch) => ({
  path: '/',
  childRoutes: [
    {
      indexRoute: HomeRoute(dispatch),
      component: layoutHoc(Home, { requireCates }),
      childRoutes: [
        GoodsRoute(routesHelper, dispatch),
        itemsServiceRoute({ dispatch }),
        itemsSpaceRoute({ dispatch }),
        CategoriedRoute(routesHelper, dispatch),
        Categories(routesHelper, dispatch),
        Tanzaku(routesHelper, dispatch),
      ],
    },
    {
      component: layoutHoc(Signinup, {}),
      childRoutes: [
        AuthLogin(routesHelper, dispatch),
        Registration(routesHelper, dispatch),
      ],
    },
    {
      component: layoutHoc(Publish, { requireAuth, confirmLeave, requireCates }),
      childRoutes: [
        ReleaseGoods(routesHelper, dispatch),
        ReleaseService(routesHelper, dispatch),
        ReleaseSpace(routesHelper, dispatch),
      ],
    },
    {
      component: layoutHoc(Mine, { requireAuth }),
      childRoutes: [
        MyAccount(dispatch),
      ],
    },
    {
      component: layoutHoc(ItemDetail, {}),
      childRoutes: [
        ItemRoute(dispatch),
      ],
    },
    {
      component: layoutHoc(Fixed, { requireAuth, confirmLeave }),
      childRoutes: [
        ReservationGoods((nextState) => {
          dispatch(editItem(nextState.params.pid));
        }, dispatch),
      ],
    },
    {
      component: layoutHoc(Ownerprofile, { }),
      childRoutes: [
        OwnerprofileRoute({ dispatch }),
      ],
    },
    {
      component: TestLayout,
      childRoutes: [
        {
          path: '/p/test',
          getComponent(_nextState, callback) {
            require.ensure([], (require) => {
              callback(null, {
                main: require('./Test/Container').default,
              });
            }, 'test');
          },
        },
      ],
    },
  ],
});
