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
};

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
= 發佈 =
===============================================>>>>>*/

export const gPublishWishUrl = (id) => {
  const paths = ['/p/publish-wish'];
  if (id) paths.push(`?id=${id}`);
  return paths.join('/');
};

export const publishWishRouter = {
  indexPath: id => gPublishWishUrl(id),
};

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
const gPublishSpaceUrl = (step = '', pid = '') => {
  const paths = ['/p/publish-space'];
  if (step) paths.push(step);
  if (pid) paths.push(`?pid=${pid}`);
  return paths.join('/');
};
export const publishSpaceRouter = {
  indexPath: pid => gPublishSpaceUrl('', pid),
  coverPath: pid => gPublishSpaceUrl('', pid),
  aboutPath: pid => gPublishSpaceUrl('step2-about', pid),
  pricePath: pid => gPublishSpaceUrl('step3-price', pid),
  regulationPath: pid => gPublishSpaceUrl('step4-regulation', pid),
  cancelPolicyPath: pid => gPublishSpaceUrl('step5-cancel-policy', pid),
  confirmPath: pid => gPublishSpaceUrl('step6-confirm', pid),
};

const gPublishGoodsUrl = (step = '', pid = '') => {
  const paths = ['/p/publish-goods'];
  if (step) paths.push(step);
  if (pid) paths.push(`?pid=${pid}`);
  return paths.join('/');
};
export const publishGoodsRouter = {
  indexPath: pid => gPublishGoodsUrl('', pid),
  coverPath: pid => gPublishGoodsUrl('', pid),
  aboutPath: pid => gPublishGoodsUrl('step2-about', pid),
  deliveryPath: pid => gPublishGoodsUrl('step3-delivery', pid),
  pricePath: pid => gPublishGoodsUrl('step4-price', pid),
  regulationPath: pid => gPublishGoodsUrl('step5-regulation', pid),
  confirmPath: pid => gPublishGoodsUrl('step7-confirm', pid),
};

/* =============================================>>>>>
= 預訂=
===============================================>>>>>*/
/* 預訂服務 */
const gReservationServiceUrl = (step = '', pid = '', cid = '') => {
  const paths = [`/p/reservation-service/${pid}`];
  if (step) paths.push(step);
  if (cid) paths.push(`?cid=${cid}`);
  return paths.join('/');
};
export const reservationService = {
  indexPath: (pid, cid) => gReservationServiceUrl('', pid, cid),
  formPath: (pid, cid) => gReservationServiceUrl('', pid, cid),
  paymentPath: (pid, cid) => gReservationServiceUrl('step2-payment', pid, cid),
  confirmPath: (pid, cid) => gReservationServiceUrl('step3-confirm', pid, cid),
};

/* 預訂空間 */
const gReservationSpaceUrl = (step = '', pid = '', cid = '') => {
  const paths = [`/p/reservation-space/${pid}`];
  if (step) paths.push(step);
  if (cid) paths.push(`?cid=${cid}`);
  return paths.join('/');
};
export const reservationSpace = {
  indexPath: (pid, cid) => gReservationSpaceUrl('', pid, cid),
  formPath: (pid, cid) => gReservationSpaceUrl('', pid, cid),
  paymentPath: (pid, cid) => gReservationSpaceUrl('step2-payment', pid, cid),
  confirmPath: (pid, cid) => gReservationSpaceUrl('step3-confirm', pid, cid),
};
/* 預訂物品 */
const gReservationGoodsUrl = (step = '', pid = '', cid = '') => {
  const paths = [`/p/reservation-goods/${pid}`];
  if (step) paths.push(step);
  if (cid) paths.push(`?cid=${cid}`);
  return paths.join('/');
};
export const reservationGoods = {
  indexPath: (pid, cid) => gReservationGoodsUrl('', pid, cid),
  formPath: (pid, cid) => gReservationGoodsUrl('', pid, cid),
  paymentPath: (pid, cid) => gReservationGoodsUrl('step2-payment', pid, cid),
  confirmPath: (pid, cid) => gReservationGoodsUrl('step3-confirm', pid, cid),
};
/* =============================================>>>>>
= 我的帳戶 =
===============================================>>>>>*/
export const my = {
  indexPath: '/p/my',
  itemPath: '/p/my/item',
  myGoodsPath: '/p/my/goods',
  myServicePath: '/p/my/service',
  mySpacePath: '/p/my/space',
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
  profilePath: '/p/my/profile',
  managePath: '/p/my/manage',
  manageVerifyPath: '/p/my/manage/verify',
  managePasswordChangePath: '/p/my/manage/password-change',
  bankSetupPath: '/p/my/bank-setup',
};
