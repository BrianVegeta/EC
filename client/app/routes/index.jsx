import layoutHoc from 'containers/layout';

// import Fixed from 'layouts/Fixed';
import Home from 'layouts/Home';
import Publish from 'layouts/Publish';
import Mine from 'layouts/MyAccount';
import Signinup from 'layouts/Signinup';
import Item from 'layouts/Item';
// import Ownerprofile from 'layouts/Ownerprofile';
import layoutOrderdetail from 'layouts/Orderdetail';
import layoutUserprofile from 'layouts/Userprofile';

import HomeRoute from './Home';
import routeItemsGoods from './Items/routeGoods';
import routeItemsService from './Items/routeService';
import routeItemsSpace from './Items/routeSpace';
import routeItemsCategory from './Items/routeCategory';
import routeWishingPond from './WishingPond/route';

// import routeItemsCategory from './ItemListCategory/route';

import routeOrderdetail from './OrderDetail/route';
import routeUserprofile from './Userprofile/route';
/* 我的帳戶 */
import routeMyAccount from './MyAccount/route';
// import Categories from './Categories';
/* 商品細節 */
import routeItem from './Item/route';
// import Tanzaku from './Tanzaku';
/* 發佈服務 */
import routePublishGoods from './PublishGoods/route';
import routePublishService from './PublishService/route';
import routePublishSpace from './PublishSpace/route';
// import ReleaseService from './Release/Service';
// import ReleaseSpace from './Release/Space';
import routeLogin from './AuthLogin/route';
import routeRegistration from './AuthRegistration/route';
/* 預訂商品 */
// import ReservationGoods from './Reservation/Goods/route';
import routeReservationService from './ReservationService/route';
import routeReservationSpace from './ReservationSpace/route';
// import OwnerprofileRoute from './Ownerprofile/route';
// import TestLayout from './Test/Container';
import sueForm from './SueForm/route';
import notify from './Notification/route';


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
        routeWishingPond(store),
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
        routeLogin(store),
        routeRegistration(store),
      ],
    },
    /* Order detail*/
    {
      component: layoutHoc(layoutOrderdetail, { requireAuth }),
      childRoutes: [
        routeOrderdetail(store),
      ],
    },
    {
      component: layoutHoc(Publish, { requireAuth, confirmLeave, requireCates }),
      childRoutes: [
        routePublishGoods(store),
        routePublishService(store),
        routePublishSpace(store),
        routeReservationService(store),
        routeReservationSpace(store),
        sueForm(store),
      ],
    },
    {
      component: layoutHoc(Item, { requireCates }),
      childRoutes: [
        routeItem(store),
      ],
    },
    {
      component: layoutHoc(Mine, { requireAuth }),
      childRoutes: [
        routeMyAccount(store),
      ],
    },
    {
      component: layoutHoc(Mine, { requireAuth }),
      childRoutes: [
        notify(store),
      ],
    },
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
