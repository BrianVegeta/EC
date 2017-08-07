import layoutHoc from 'containers/layoutHoc';

import { editItem } from 'actions/itemActions';

// import Fixed from 'layouts/Fixed';
import Home from 'layouts/Home';
// import ItemDetail from 'layouts/ItemDetail';
// import Mine from 'layouts/MyAccount';
// import Publish from 'layouts/Publish';
import Signinup from 'layouts/Signinup';
// import Ownerprofile from 'layouts/Ownerprofile';
import layoutOrderdetail from 'layouts/Orderdetail';
import layoutUserprofile from 'layouts/Userprofile';

import HomeRoute from './Home';
// items route
// import routeItemsSpace from './Items/Space/route';
// import routeItemsService from './Items/Service/route';
// import routeItemsGoods from './Items/Goods/route';
// import routeItemsCategoried from './Items/Categoried/route';
import routeOrderdetail from './OrderDetail/route';
import routeUserprofile from './Userprofile/route';

// import routeMyAccount from './MyAccount/route';
// import Categories from './Categories';
// import ItemRoute from './Item';
// import Tanzaku from './Tanzaku';
// import ReleaseGoods from './Release/Goods';
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
      // childRoutes: [
      //   routeItemsGoods({ dispatch }),
      //   routeItemsService({ dispatch }),
      //   routeItemsSpace({ dispatch }),
      //   routeItemsCategoried({ dispatch }),
      //
      //   Categories(routesHelper, dispatch),
      //   // Tanzaku(routesHelper, dispatch),
      // ],
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
    // {
    //   component: layoutHoc(Publish, { requireAuth, confirmLeave, requireCates }),
    //   childRoutes: [
    //     ReleaseGoods(routesHelper, dispatch),
    //     ReleaseService(routesHelper, dispatch),
    //     ReleaseSpace(routesHelper, dispatch),
    //   ],
    // },
    // {
    //   component: layoutHoc(Mine, { requireAuth }),
    //   childRoutes: [
    //     routeMyAccount({ dispatch }),
    //   ],
    // },
    // {
    //   component: layoutHoc(ItemDetail, {}),
    //   childRoutes: [
    //     ItemRoute(dispatch),
    //   ],
    // },
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
