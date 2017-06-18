import Layout from '../containers/LayoutContainer';
import LayoutPublish from '../containers/LayoutPublishContainer';
import LayoutItem from '../containers/LayoutItemContainer';
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
import AuthLogin from './AuthLogin';
import Registration from './Auth/Registration';

const routes = (routesHelper, dispatch) => ({
  path: '/',
  childRoutes: [
    {
      indexRoute: HomeRoute(),
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
      component: LayoutItem,
      childRoutes: [
        ItemRoute(routesHelper),
      ],
    },
  ],
});
export default routes;
