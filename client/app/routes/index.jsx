import Layout from '../containers/LayoutContainer';
import LayoutShort from '../containers/LayoutShortContainer';
import HomeRoute from './Home';
import GoodsRoute from './Items/Goods';
import ServiceRoute from './Items/Service';
import SpaceRoute from './Items/Space';
import CategoriedRoute from './Items/Categoried';
import Categories from './Categories';
import ItemRoute from './Item';

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
      ],
    },
    {
      component: LayoutShort,
      childRoutes: [
        ItemRoute(routesHelper),
      ],
    },
  ],
});
export default routes;
