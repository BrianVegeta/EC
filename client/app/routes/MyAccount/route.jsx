import { omit } from 'lodash';
import { my } from 'lib/paths';
import routeMyGoods from './routes/Item/Goods/route';
import routeMyService from './routes/Item/Service/route';
import routeMySpace from './routes/Item/Space/route';
import routeMyCollection from './routes/Collections/route';
import routeMyCoupon from './routes/Coupon/route';
import routeMyWishList from './routes/Wish/route';
import routeMyOwnerComment from './routes/CommentOwner/route';
import routeMyLesseeComment from './routes/CommentLessee/route';
import routeMyCalendar from './routes/Calendar/route';
import routeWalletAll from './routes/Wallet/All/route';
import routeWalletIn from './routes/Wallet/In/route';
import routeWalletOut from './routes/Wallet/Out/route';
import routeOoIt from './routes/OwnerOrder/OoIt/route';
import routeOoSe from './routes/OwnerOrder/OoSe/route';
import routeOoSp from './routes/OwnerOrder/OoSp/route';
import routeLoIt from './routes/LesseeOrder/LoIt/route';
import routeLoSe from './routes/LesseeOrder/LoSe/route';
import routeLoSp from './routes/LesseeOrder/LoSp/route';
import routeProfile from './routes/Profile/route';
import routeManage from './routes/Manage/route';
import routeBankSetup from './routes/BankSetup/route';

export default store => ({
  path: my.indexPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const MyAccount = require('./containers/MyAccountContainer').default;
      cb(null, MyAccount);
    }, 'my.acc');
  },

  indexRoute: omit(routeMyGoods(store), ['path']),

  childRoutes: [
    routeMyGoods(store),
    routeMyService(store),
    routeMySpace(store),
    routeMyCollection(store),
    routeMyCoupon(store),
    routeMyOwnerComment(store),
    routeMyLesseeComment(store),
    routeMyWishList(store),
    routeMyCalendar(store),
    routeWalletAll(store),
    routeWalletIn(store),
    routeWalletOut(store),
    routeOoIt(store),
    routeOoSe(store),
    routeOoSp(store),
    routeLoIt(store),
    routeLoSe(store),
    routeLoSp(store),
    routeProfile(store),
    routeManage(store),
    routeBankSetup(store),
  ],
});
