/* eslint-disable import/prefer-default-export */

export const LOGIN = '/p/login';


const escapeAlias = alias =>
  alias.replace(/[^\u4e00-\u9fa5a-zA-Z0-9-_]/g, '-');

export const itemPath = (name, id) =>
  `/p/${escapeAlias(name)}-i.${id}`;

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
}

export const items = {
  servicePath: '/p/i/service',
};

/* 發佈服務 */
export const publishService = {
  indexPath: '/p/publish-service',
  coverPath: '/p/publish-service',
  aboutPath: '/p/publish-service/step2-about',
  deliveryPath: '/p/publish-service/step3-delivery',
  pricePath: '/p/publish-service/step4-price',
  regulationPath: '/p/publish-service/step5-regulation',
  confirmPath: '/p/publish-service/step6-confirm',
};

/* 預訂服務 */
export const reservationService = {
  indexPath: pid => `/p/reservation-service/${pid}`,
  formPath: pid => `/p/reservation-service/${pid}`,
  paymentPath: pid => `/p/reservation-service/${pid}/step2-payment`,
  confirmPath: pid => `/p/reservation-service/${pid}/step3-confirm`,
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
