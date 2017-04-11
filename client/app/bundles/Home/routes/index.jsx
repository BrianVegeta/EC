import Layout from '../containers/LayoutContainer';
import HomeRoute from './Home';
import GoodsRoute from './Items/Goods';
import ServiceRoute from './Items/Service';
import SpaceRoute from './Items/Space';
import CategoriedRoute from './Items/Categoried';
import Categories from './Categories';


const routes = (routesHelper, dispatch) => ({
  path: '/',
  component: Layout,
  indexRoute: HomeRoute(),
  childRoutes: [
    GoodsRoute(routesHelper, dispatch),
    ServiceRoute(routesHelper, dispatch),
    SpaceRoute(routesHelper, dispatch),
    CategoriedRoute(routesHelper, dispatch),
    Categories(routesHelper, dispatch),
  ],
});
export default routes;
