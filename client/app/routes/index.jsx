import layoutHoc from 'containers/layoutHoc';

import { requireLoginAndGetUser } from 'actions/authActions';
import { editItem } from 'actions/itemActions';
import { confirmLeavePage } from 'lib/confirm';
import Layout from '../containersLayout/Home';
import LayoutPublish from '../containers/LayoutPublishContainer';
import LayoutItemDetail from '../containersLayout/ItemDetail';
import LayoutMyAccount from '../containersLayout/MyAccount';
import Fixed from '../containersLayout/Fixed';

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

const routes = (routesHelper, dispatch) => ({
  path: '/',
  childRoutes: [
    {
      indexRoute: HomeRoute(dispatch),
      component: Layout,
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
      component: LayoutPublish,
      childRoutes: [
        AuthLogin(routesHelper, dispatch),
        Registration(routesHelper, dispatch),
        ReleaseGoods(routesHelper, dispatch),
        ReleaseService(routesHelper, dispatch),
        ReleaseSpace(routesHelper, dispatch),
      ],
    },
    {
      component: LayoutMyAccount,
      childRoutes: [
        MyAccount(() => {
          dispatch(requireLoginAndGetUser());
        }),
      ],
    },
    {
      component: LayoutItemDetail,
      childRoutes: [
        ItemRoute(dispatch),
      ],
    },
    {
      component: layoutHoc(Fixed, { requireAuth: true }),
      childRoutes: [
        ReservationGoods((nextState) => {
          window.addEventListener('beforeunload', confirmLeavePage);
          dispatch(editItem(nextState.params.pid));
        }),
      ],
    },
  ],
});
export default routes;
