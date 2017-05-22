import Layout from '../containers/LayoutContainer';
import LayoutRelease from '../containers/LayoutReleaseContainer';
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
import Release from './Release';
import ReleaseGoods from './Release/Goods';

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
        ReleaseGoods(routesHelper, dispatch),
      ],
    },
    {
      component: LayoutRelease,
      childRoutes: [
        Release(routesHelper, dispatch),
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
