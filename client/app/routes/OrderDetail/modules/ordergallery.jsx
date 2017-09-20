import { List } from 'immutable';
import { asyncXhrPutImage } from 'lib/xhr';
import {
  base64ToBlobData,
  asyncS3ToBlob,
  asyncContainBlobTobase64,
} from 'lib/utils';

import {
  OWNER_SEND,
  LESSEE_RECEIVE,
  LESSEE_SEND,
  OWNER_RECEIVE,
} from './orderaction';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'ORDERDETAIL.COVERS';
const COVER_PARAM_KEY = 'croppedImage';
export const REDUCER_KEY = 'ordergallery';

const initialThumb = {
  key: '?',
  blob: null,
  s3: null,
  isUploading: false,
  isStored: false,
};

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const SETUP_COVERS = prefix('SETUP_COVERS');
const CREATE_COVER = prefix('CREATE_COVER');
const DELETE_COVER = prefix('DELETE_COVER');
const UPDATING_COVER = prefix('UPDATING_COVER');
const UPDATED_COVER = prefix('UPDATED_COVER');
const CHANGE_ORDERS = prefix('CHANGE_ORDERS');
const RESET = prefix('RESET');


// =============================================
// = actions =
// =============================================

export const setupCovers = covers => ({
  type: SETUP_COVERS,
  covers,
});

export const createCover = (blob, cidNo) => ({
  type: CREATE_COVER,
  blob,
  cidNo,
});

export const changeOrders = covers => ({
  type: CHANGE_ORDERS,
  covers,
});

export const deleteCover = key => ({
  type: DELETE_COVER,
  key,
});

export const updatingCover = (key, blob) => ({
  type: UPDATING_COVER,
  blob,
  key,
});

export const updatedCover = (key, blob, s3) => ({
  type: UPDATED_COVER,
  blob,
  s3,
  key,
});

export const reset = () => ({
  type: RESET,
});

const generateKey = index => `KEY_${Date.now().toString()}${index}`;

const asyncTransformBlob = ({ img1, img2 }) =>
  new Promise((resolve) => {
    const promises = [];
    if (img1) promises.push(asyncS3ToBlob(img1));
    if (img2) promises.push(asyncS3ToBlob(img2));
    Promise.all(promises).then((results) => {
      resolve(results);
    }).catch(e => console.log(e));
  });

export const setupCoversForEdit = ({ img1, img2 }) =>
  dispatch =>
    new Promise((resolve) => {
      const restoreThumb = (s3, blob, key) =>
        Object.assign({}, initialThumb, { s3, blob, isStored: true, key });

      const paddingCovers = [];
      if (img1) paddingCovers.push(restoreThumb(img1, null, null));
      if (img2) paddingCovers.push(restoreThumb(img2, null, null));
      dispatch(setupCovers(paddingCovers));

      asyncTransformBlob(
        { img1, img2 },
      ).then((blobs) => {
        const covers = [];
        if (img1) covers.push(restoreThumb(img1, blobs[0], generateKey(0)));
        if (img2) covers.push(restoreThumb(img2, blobs[1], generateKey(1)));
        dispatch(setupCovers(covers));
        resolve();
      });
    });


export const asyncUploadCover = (key, base64, cidNo, type) =>
  dispatch =>
    new Promise((resolve, reject) => {
      const blobData = base64ToBlobData(base64);

      dispatch(updatedCover(key, URL.createObjectURL(blobData)));
      const formData = new FormData();
      formData.append(COVER_PARAM_KEY, blobData);
      let url = '';
      switch (type) {
        case OWNER_SEND:
        case LESSEE_RECEIVE:
          url = `/ajax/images/ship/${cidNo}.json`;
          break;
        case LESSEE_SEND:
        case OWNER_RECEIVE:
          url = `/ajax/images/return/${cidNo}.json`;
          break;
        default:
          reject('INVALID TYPE');
          return;
      }
      asyncXhrPutImage(url, formData)
      .then((s3) => {
        asyncS3ToBlob(s3)
        .then((responseBlobUrl) => {
          resolve(s3);
          dispatch(updatedCover(key, responseBlobUrl, s3));
        });
      })
      .catch(e => reject(e));
    });

export const asyncUploadBlobCover = ({ key, blob, cidNo, s3, isStored }, type) =>
  dispatch =>
    new Promise((resolve) => {
      if (isStored) {
        resolve(s3);
        return;
      }
      asyncContainBlobTobase64(blob)
      .then((base64) => {
        dispatch(asyncUploadCover(key, base64, cidNo, type))
        .then(newS3 => resolve(newS3))
        .catch(e => console.log(e));
      });
    });

export const processRawCovers = type =>
  (dispatch, getState) =>
    new Promise((resolve) => {
      const covers = getState()[REDUCER_KEY];
      const promises = covers.map(cover =>
        dispatch(asyncUploadBlobCover(cover, type)),
      );
      Promise.all(promises)
      .then(results => resolve(results))
      .catch(e => console.log(e));
    });

// =============================================
// = reducer =
// =============================================
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SETUP_COVERS:
      return action.covers;

    case CREATE_COVER: {
      const index = state.length;
      return state.concat(
        Object.assign({}, initialThumb, {
          key: generateKey(index),
          blob: action.blob,
          cidNo: action.cidNo,
        }),
      );
    }

    case DELETE_COVER:
      return List(state).delete(
        List(state).findIndex(cover => (cover.key === action.key)),
      ).toJS();

    case UPDATING_COVER:
      return List(state).update(
        List(state).findIndex(cover => (cover.key === action.key)),
        cover => Object.assign({}, cover, {
          isUploading: true,
          isStored: false,
          blob: action.blob,
        }),
      ).toJS();

    case UPDATED_COVER:
      return List(state).update(
        List(state).findIndex(cover => (cover.key === action.key)),
        val => Object.assign({}, val, {
          isUploading: false,
          isStored: true,
          blob: action.blob,
          s3: action.s3,
        }),
      ).toJS();

    case CHANGE_ORDERS:
      return action.covers;

    case RESET:
      return initialState;

    default:
      return state;
  }
};
