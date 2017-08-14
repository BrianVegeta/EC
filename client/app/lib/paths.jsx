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

export const publish = {
  spaceIndexPath: '/p/publish-space',
};

export const publishService = {
  indexPath: '/p/publish-service',
  coverPath: '/p/publish-service/step1-cover',
  aboutPath: '/p/publish-service/step2-about',
  deliveryPath: '/p/publish-service/step3-delivery',
  pricePath: '/p/publish-service/step4-price',
  regulationPath: '/p/publish-service/step5-regulation',
  cancelPolicyPath: '/p/publish-service/step6-cancel-policy',
  confirmPath: '/p/publish-service/step7-confirm',
};
export const my = {
  indexPath: '/p/my',
  itemPath: '/p/my/item',
  wishPath: '/p/my/wish',
  OwnerOrderItem: '/p/my/oo-it:tabName',
  OwnerOrderService: '/p/my/oo-se:tabName',
  OwnerOrderSpace: '/p/my/oo-sp:tabName',
  LesseeOrderItem: '/p/my/lo-it:tabName',
  LesseeOrderService: '/p/my/lo-se:tabName',
  LesseeOrderSpace: '/p/my/lo-sp:tabName',
  walletPath: '/p/my/wallet-all',
  walletPathIn: '/p/my/wallet-in',
  walletPathOut: '/p/my/wallet-out',
  collectionPath: '/p/my/collections',
  calendarPath: '/p/my/calendar',
  couponPath: '/p/my/coupon',
  commentPath: '/p/my/comment',
  commentOwnerPath: '/p/my/comment-owner',
  commentLesseePath: '/p/my/comment-lessee',
};
