/* eslint-disable import/prefer-default-export */

export const LOGIN = '/p/login';


const escapeAlias = alias =>
  alias.replace(/[^\u4e00-\u9fa5a-zA-Z0-9-_]/g, '-');

export const itemPath = (name, id) =>
  `/p/${escapeAlias(name)}-i.${id}`;

export const categoriedItemPath = (categoryName, cid) =>
  `/p/i/${escapeAlias(categoryName)}-c.${cid}`;

export const userprofilePaths = {
  itemsGoodsPath: uid => `/p/userprofile/${uid}/items-goods`,
  itemsServiePath: uid => `/p/userprofile/${uid}/items-service`,
  itemsSpacePath: uid => `/p/userprofile/${uid}/items-space`,
  wishListPath: uid => `/p/userprofile/${uid}/wish-list`,
  commentsOwnerPath: uid => `/p/userprofile/${uid}/comments-owner`,
  commentsLesseePath: uid => `/p/userprofile/${uid}/comments-lessee`,
};
