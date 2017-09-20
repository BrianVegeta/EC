import { my as mineRouter } from 'lib/paths';

export default {
  items: { text: '上架紀錄', path: mineRouter.myGoodsPath },
  ownerOrder: { text: '商家訂單', path: mineRouter.ownerOrderItem('TAB_REQUEST') },
  calendar: { text: '行事曆', path: mineRouter.calendarPath },
  lesseeOrder: { text: '消費狀態', path: mineRouter.lesseeOrderItem('TAB_REQUEST') },
  wishs: { text: '許願紙條', path: mineRouter.wishPath },
  coupon: { text: '優惠券', path: mineRouter.couponPath },
  collection: { text: '收藏', path: mineRouter.collectionPath },
  wallet: { text: '我的錢包', path: mineRouter.walletPath },
  comment: { text: '評價', path: mineRouter.commentOwnerPath },
  profile: { text: '公開資訊', path: mineRouter.profilePath },
  manageVerify: { text: '帳號管理', path: mineRouter.manageVerifyPath },
  bankSetUp: { text: '收款設定', path: mineRouter.bankSetupPath },
};
