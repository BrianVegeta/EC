/* eslint-disable import/prefer-default-export */
import { trim } from 'lodash';

export const LOGIN = '/p/login';
export const loginPath = '/p/login';
export const registrationPath = '/p/registration';


const escapeAlias = (alias) => {
  const duplicated = alias.replace(/[^\u4e00-\u9fa5a-zA-Z0-9-_]/g, '-');
  const dashLine = duplicated.replace(/((.)\2)+/g, '-');
  const trimed = trim(dashLine, '-');
  return trimed || '-';
};

export const authPath = {
  loginPath: '/p/login',
  registrationPath: '/p/registration',
}
export const itemPath = (name, pid, escape = true) =>
  `/p/${escape ? escapeAlias(name) : name}-i.${pid}`;

export const categoriedItemPath = (categoryName, cid) =>
  `/p/i/${escapeAlias(categoryName)}-c.${cid}`;

export const userprofilePaths = {
  indexPath: uid => `/p/userprofile/${uid}`,
  itemsGoodsPath: uid => `/p/userprofile/${uid}/items-goods`,
  itemsServiePath: uid => `/p/userprofile/${uid}/items-service`,
  itemsSpacePath: uid => `/p/userprofile/${uid}/items-space`,
  wishListPath: uid => `/p/userprofile/${uid}/wish-list`,
  commentsOwnerPath: uid => `/p/userprofile/${uid}/comments-owner`,
  commentsLesseePath: uid => `/p/userprofile/${uid}/comments-lessee`,
};

export const notifyPath = {
  contractNotifyPath: '/p/notify/contract',
  activityNotifyPath: '/p/notify/activity',
  systemNotifyPath: '/p/notify/system',
};

/* 商品列表 */
export const items = {
  servicePath: '/p/i/service',
  goodsPath: '/p/i/goods',
  spacePath: '/p/i/space',
};

export const wishRouter = {
  indexPath: '/p/i/wishing-pond',
};


/* =============================================>>>>>
= 發佈服務 =
===============================================>>>>>*/
const gPublishServiceUrl = (step = '', pid = '') => {
  const paths = ['/p/publish-service'];
  if (step) paths.push(step);
  if (pid) paths.push(`?pid=${pid}`);
  return paths.join('/');
};
export const publishServiceRouter = {
  indexPath: pid => gPublishServiceUrl('', pid),
  coverPath: pid => gPublishServiceUrl('', pid),
  aboutPath: pid => gPublishServiceUrl('step2-about', pid),
  deliveryPath: pid => gPublishServiceUrl('step3-delivery', pid),
  pricePath: pid => gPublishServiceUrl('step4-price', pid),
  regulationPath: pid => gPublishServiceUrl('step5-regulation', pid),
  cancelPolicyPath: pid => gPublishServiceUrl('step6-cancel-policy', pid),
  confirmPath: pid => gPublishServiceUrl('step7-confirm', pid),
};

/* 預訂服務 */
export const reservationService = {
  indexPath: pid => `/p/reservation-service/${pid}`,
  formPath: pid => `/p/reservation-service/${pid}`,
  paymentPath: pid => `/p/reservation-service/${pid}/step2-payment`,
  confirmPath: pid => `/p/reservation-service/${pid}/step3-confirm`,
};
/* 預訂物品 */
export const reservationGoods = {
  indexPath: pid => `/p/reservation-goods/${pid}`,
};
/* 預訂空間 */
export const reservationSpace = {
  indexPath: pid => `/p/reservation-space/${pid}`,
};


export const orderRouter = {
  orderPath: cid => `/p/order_detail/${cid}`,
  sueFormPath: cid => `/p/sue-form/${cid}`,
};

/* 我的帳戶 */
export const my = {
  indexPath: '/p/my',
  itemPath: '/p/my/item',
  wishPath: '/p/my/wish',
  ownerOrderItem: tabName => `/p/my/oo-it${tabName}`,
  ownerOrderService: tabName => `/p/my/oo-se${tabName}`,
  ownerOrderSpace: tabName => `/p/my/oo-sp${tabName}`,
  lesseeOrderItem: tabName => `/p/my/lo-it${tabName}`,
  lesseeOrderService: tabName => `/p/my/lo-se${tabName}`,
  lesseeOrderSpace: tabName => `/p/my/lo-sp${tabName}`,
  walletPath: '/p/my/wallet-all',
  walletPathIn: '/p/my/wallet-in',
  walletPathOut: '/p/my/wallet-out',
  collectionPath: '/p/my/collections',
  calendarPath: '/p/my/calendar',
  couponPath: '/p/my/coupon',
  commentOwnerPath: '/p/my/comment-owner',
  commentLesseePath: '/p/my/comment-lessee',
};
