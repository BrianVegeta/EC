import Layout from '../containersLayout/Home';
import LayoutPublish from '../containers/LayoutPublishContainer';
import LayoutItemDetail from '../containersLayout/ItemDetail';
import LayoutMyAccount from '../containersLayout/MyAccount';
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
        MyAccount(dispatch),
      ],
    },
    {
      component: LayoutItemDetail,
      childRoutes: [
        ItemRoute(dispatch),
      ],
    },
  ],
});
export default routes;
