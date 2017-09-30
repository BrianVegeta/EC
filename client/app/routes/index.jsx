import layoutHoc from 'containers/layout';
import Root from 'containers/layout/Root';

import Home from 'layouts/Home';
import Publish from 'layouts/Publish';
import Mine from 'layouts/MyAccount';
import Signinup from 'layouts/Signinup';
import Wish from 'layouts/Wish';
import WishDetail from 'layouts/WishDetail';
import Item from 'layouts/Item';
import layoutOrderdetail from 'layouts/Orderdetail';
import layoutUserprofile from 'layouts/Userprofile';

import HomeRoute from './Home';
import routeItemsGoods from './Items/routeGoods';
import routeItemsService from './Items/routeService';
import routeItemsSpace from './Items/routeSpace';
import routeItemsUsedGoods from './Items/routeUsedGoods';
import routeItemsCategory from './Items/routeCategory';
import routeWishingPond from './WishingPond/route';
import routeOrderdetail from './OrderDetail/route';
import routeUserprofile from './Userprofile/route';
/* 我的帳戶 */
import routeMyAccount from './MyAccount/route';
/* 商品細節 */
import routeItem from './Item/route';
/* 發佈服務 */
import routePublishGoods from './PublishGoods/route';
import routePublishService from './PublishService/route';
import routePublishSpace from './PublishSpace/route';
import routePublishUsedGoods from './PublishUsedGoods/route';

import routePublishWish from './PublishWish/route';
import routeWishDetail from './WishDetail/route';
/* 登入，註冊，忘記密碼 */
import routeLogin from './AuthLogin/route';
import routeRegistration from './AuthRegistration/route';
import routeForgotPassword from './AuthForgotPassword/route';
/* 預訂商品 */
import routeReservationService from './ReservationService/route';
import routeReservationSpace from './ReservationSpace/route';
import routeReservationGoods from './ReservationGoods/route';
import routeReservationUsedGoods from './ReservationUsedGoods/route';

import routeSevenEleven from './SevenEleven/route';
import sueForm from './SueForm/route';
import routeNotify from './Notification/route';
// import test from './Test/route';


const requireCates = true;
const requireAuth = true;
const confirmLeave = true;

export default store => ({
  path: '/',
  component: Root,
  childRoutes: [
    // test(),
    {
      indexRoute: HomeRoute(store.dispatch),
      component: layoutHoc(Home, { requireCates }),
      childRoutes: [
        routeItemsGoods(store),
        routeItemsService(store),
        routeItemsSpace(store),
        routeItemsUsedGoods(store),
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
        routeForgotPassword(store),
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
        routePublishUsedGoods(store),
        routeReservationGoods(store),
        routeReservationService(store),
        routeReservationSpace(store),
        routeReservationUsedGoods(store),
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
        routeNotify(store),
        routeSevenEleven(store),
      ],
    },
    {
      component: layoutHoc(Wish, { requireAuth, confirmLeave, requireCates }),
      childRoutes: [
        routePublishWish(store),
      ],
    },
    {
      component: layoutHoc(WishDetail, { requireCates }),
      childRoutes: [
        routeWishDetail(store),
      ],
    },
  ],
});
