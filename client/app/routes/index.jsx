import layoutHoc from 'containers/layoutHoc';

// import Fixed from 'layouts/Fixed';
import Home from 'layouts/Home';
import layoutItemDetail from 'layouts/ItemDetail';
// import Mine from 'layouts/MyAccount';
import Publish from 'layouts/Publish';
import Signinup from 'layouts/Signinup';
// import Ownerprofile from 'layouts/Ownerprofile';
import layoutOrderdetail from 'layouts/Orderdetail';
import layoutUserprofile from 'layouts/Userprofile';

import HomeRoute from './Home';
import routeItemsGoods from './Items/routeGoods';
import routeItemsService from './Items/routeService';
import routeItemsSpace from './Items/routeSpace';
import routeItemsCategory from './Items/routeCategory';

// import routeItemsCategory from './ItemListCategory/route';

import routeOrderdetail from './OrderDetail/route';
import routeUserprofile from './Userprofile/route';

// import routeMyAccount from './MyAccount/route';
// import Categories from './Categories';
import routeItem from './Item/route';
// import Tanzaku from './Tanzaku';
import PublishService from './PublishService/route';
// import ReleaseService from './Release/Service';
// import ReleaseSpace from './Release/Space';
import AuthLogin from './Auth/Login';
// import Registration from './Auth/Registration';
// import ReservationGoods from './Reservation/Goods/route';
// import OwnerprofileRoute from './Ownerprofile/route';
// import TestLayout from './Test/Container';


const requireCates = true;
const requireAuth = true;
const confirmLeave = true;

export default store => ({
  path: '/',
  childRoutes: [
    {
      indexRoute: HomeRoute(store.dispatch),
      component: layoutHoc(Home, { requireCates }),
      childRoutes: [
        routeItemsGoods(store),
        routeItemsService(store),
        routeItemsSpace(store),
        routeItemsCategory(store),

        // Categories(routesHelper, dispatch),
        // // Tanzaku(routesHelper, dispatch),
      ],
    },
    /* User profile */
    {
      component: layoutHoc(layoutUserprofile, {}),
      childRoutes: [
        routeUserprofile(store),
      ],
    },
    {
      component: layoutHoc(Signinup, {}),
      childRoutes: [
        AuthLogin(store.routesHelper, store.dispatch),
        // Registration(routesHelper, dispatch),
      ],
    },
    /* Order detail*/
    {
      component: layoutHoc(layoutOrderdetail, {}),
      childRoutes: [
        routeOrderdetail(store),
      ],
    },
    {
      component: layoutHoc(Publish, { requireAuth, confirmLeave, requireCates }),
      childRoutes: [
        PublishService(store),
        // ReleaseService(store.routesHelper, store.dispatch),
        // ReleaseSpace(routesHelper, dispatch),
      ],
    },
    // {
    //   component: layoutHoc(Mine, { requireAuth }),
    //   childRoutes: [
    //     routeMyAccount({ dispatch }),
    //   ],
    // },
    {
      component: layoutHoc(layoutItemDetail, {}),
      childRoutes: [
        routeItem(store),
      ],
    },
    // {
    //   component: layoutHoc(Fixed, { requireAuth, confirmLeave }),
    //   childRoutes: [
    //     ReservationGoods((nextState) => {
    //       dispatch(editItem(nextState.params.pid));
    //     }, dispatch),
    //   ],
    // },
    // {
    //   component: layoutHoc(Ownerprofile, { }),
    //   childRoutes: [
    //     OwnerprofileRoute({ dispatch }),
    //   ],
    // },
    // {
    //   component: TestLayout,
    //   childRoutes: [
    //     {
    //       path: '/p/test',
    //       getComponent(_nextState, callback) {
    //         require.ensure([], (require) => {
    //           callback(null, {
    //             main: require('./Test/Container').default,
    //           });
    //         }, 'test');
    //       },
    //     },
    //   ],
    // },
  ],
});
