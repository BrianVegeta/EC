import { List } from 'immutable';
import { asyncXhrPutImage } from 'lib/xhr';
import {
  base64ToBlobData,
  asyncS3ToBlob,
  asyncContainBlobTobase64,
  generateRandomKey,
} from 'lib/utils';


/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'PUBLISH.COVERS.GOODS';
const COVER_PARAM_KEY = 'croppedImage';
export const REDUCER_KEY = 'publishGoodsCovers';


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

/* =============================================>>>>>
= helpers =
===============================================>>>>>*/
const initialThumb = {
  key: '?',
  blob: null,
  s3: null,
  isUploading: false,
  isStored: false,
};


// =============================================
// = actions =
// =============================================

export const setupCovers = covers => ({
  type: SETUP_COVERS,
  covers,
});

export const createCover = blob => ({
  type: CREATE_COVER,
  blob,
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

export function uploadCover(key, base64) {
  return (dispatch) => {
    const blob = base64ToBlobData(base64);
    dispatch(updatedCover(key, URL.createObjectURL(blob)));

    const formData = new FormData();
    formData.append(COVER_PARAM_KEY, blob);

    asyncXhrPutImage('/ajax/images/item_cover.json', formData)
    .then((s3) => {
      asyncS3ToBlob(s3)
      .then(responseBlobUrl =>
        dispatch(updatedCover(key, responseBlobUrl, s3)),
      );
    });
  };
}

export const asyncUploadCover = (key, base64) =>
  dispatch =>
    new Promise((resolve, reject) => {
      const blobData = base64ToBlobData(base64);

      dispatch(updatedCover(key, URL.createObjectURL(blobData)));
      const formData = new FormData();
      formData.append(COVER_PARAM_KEY, blobData);

      asyncXhrPutImage('/ajax/images/item_cover.json', formData)
      .then((s3) => {
        asyncS3ToBlob(s3)
        .then((responseBlobUrl) => {
          resolve(s3);
          dispatch(updatedCover(key, responseBlobUrl, s3));
        });
      })
      .catch(e => reject(e));
    });

export const asyncUploadBlobCover = (key, blob) =>
  dispatch =>
    new Promise((resolve) => {
      asyncContainBlobTobase64(blob)
      .then((base64) => {
        dispatch(asyncUploadCover(key, base64))
        .then(s3 => resolve(s3))
        .catch(e => console.log(e));
      });
    });

export const processRawCovers = () =>
  (dispatch, getState) =>
    new Promise((resolve) => {
      const covers = getState()[REDUCER_KEY];
      const rawCovers = covers.filter(cover => !cover.isStored);
      const promises = rawCovers.map(cover =>
        dispatch(asyncUploadBlobCover(cover.key, cover.blob)),
      );
      Promise.all(promises)
      .then(results => resolve(results))
      .catch(e => console.log(e));
    });

/* restore covers below */
const asyncTransformBlob = ({ img1, img2, img3 }) =>
  new Promise((resolve) => {
    const promises = [];
    if (img1) promises.push(asyncS3ToBlob(img1));
    if (img2) promises.push(asyncS3ToBlob(img2));
    if (img3) promises.push(asyncS3ToBlob(img3));
    Promise.all(promises).then((results) => {
      resolve(results);
    }).catch(e => console.log(e));
  });

export const setupCoversForEdit = ({ img1, img2, img3 }) =>
  dispatch =>
    new Promise((resolve) => {
      const restoreThumb = (s3, blob) =>
        Object.assign({}, initialThumb, {
          key: generateRandomKey(),
          s3,
          blob,
          isStored: true,
        });

      const paddingCovers = [];
      if (img1) paddingCovers.push(restoreThumb(img1, null));
      if (img2) paddingCovers.push(restoreThumb(img2, null));
      if (img3) paddingCovers.push(restoreThumb(img3, null));
      dispatch(setupCovers(paddingCovers));

      asyncTransformBlob(
        { img1, img2, img3 },
      ).then((blobs) => {
        const covers = [];
        if (img1) covers.push(restoreThumb(img1, blobs[0]));
        if (img2) covers.push(restoreThumb(img2, blobs[1]));
        if (img3) covers.push(restoreThumb(img3, blobs[2]));
        dispatch(setupCovers(covers));
        resolve();
      });
    });


// =============================================
// = reducer =
// =============================================
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {

    case SETUP_COVERS:
      return action.covers;

    case CREATE_COVER:
      return state.concat(
        Object.assign({}, initialThumb, {
          key: generateRandomKey(),
          blob: action.blob,
        }),
      );

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
