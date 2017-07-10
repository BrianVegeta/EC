import layoutHoc from 'containers/layoutHoc';

import { requireLoginAndGetUser } from 'actions/authActions';
import { editItem } from 'actions/itemActions';

import Fixed from 'layouts/Fixed';
import Home from 'layouts/Home';
import ItemDetail from 'layouts/ItemDetail';
import Mine from 'layouts/MyAccount';
import Publish from 'layouts/Publish';

import HomeRoute from './Home';
import GoodsRoute from './Items/Goods';
import ServiceRoute from './Items/Service';
import SpaceRoute from './Items/Space';
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

export default (routesHelper, dispatch) => ({
  path: '/',
  childRoutes: [
    {
      indexRoute: HomeRoute(dispatch),
      component: layoutHoc(Home, {}),
      childRoutes: [
        GoodsRoute(routesHelper, dispatch),
        ServiceRoute(routesHelper, dispatch),
        SpaceRoute(routesHelper, dispatch),
        CategoriedRoute(routesHelper, dispatch),
        Categories(routesHelper, dispatch),
        Tanzaku(routesHelper, dispatch),
      ],
    },
    {
      component: layoutHoc(Publish, {}),
      childRoutes: [
        AuthLogin(routesHelper, dispatch),
      ],
    },
    {
      component: layoutHoc(Publish, { requireAuth: true, confirmLeave: true }),
      childRoutes: [
        Registration(routesHelper, dispatch),
        ReleaseGoods(routesHelper, dispatch),
        ReleaseService(routesHelper, dispatch),
        ReleaseSpace(routesHelper, dispatch),
      ],
    },
    {
      component: layoutHoc(Mine, {}),
      childRoutes: [
        MyAccount(() => {
          dispatch(requireLoginAndGetUser());
        }),
      ],
    },
    {
      component: layoutHoc(ItemDetail, {}),
      childRoutes: [
        ItemRoute(dispatch),
      ],
    },
    {
      component: layoutHoc(Fixed, { requireAuth: true, confirmLeave: true }),
      childRoutes: [
        ReservationGoods((nextState) => {
          dispatch(editItem(nextState.params.pid));
        }),
      ],
    },
  ],
});
