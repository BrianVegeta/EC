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

export const my = {
  indexPath: '/p/my',
  itemPath: '/p/my/item',
  wishPath: '/p/my/wish',
  walletPath: '/p/my/wallet',
  collectionPath: '/p/my/collections',
  calendarPath: '/p/my/calendar',
  couponPath: '/p/my/coupon',
  commentPath: '/p/my/comment',
  commentOwnerPath: '/p/my/comment-owner',
  commentLesseePath: '/p/my/comment-lessee',
};
