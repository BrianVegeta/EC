import { asyncXhrPost } from 'lib/xhr';
import { List } from 'immutable';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'PUBLISH.COVERS';


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const CREATE_COVER = prefix('CREATE_COVER');
const DELETE_COVER = prefix('DELETE_COVER');
const UPDATING_COVER = prefix('UPDATING_COVER');
const UPDATED_COVER = prefix('UPDATED_COVER');
const CHANGE_ORDERS = prefix('CHANGE_ORDERS');
const RESET = prefix('RESET');


// =============================================
// = actions =
// =============================================

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

/* base64 trans to blob */
function toBlob(dataBase64, type) {
  const binStr = atob(dataBase64.split(',')[1]);
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new Blob([arr], { type: (type || 'image/jpg') });
}

/* s3 url to blob url */
function s3ImageToBlob(s3Url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', s3Url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = () => {
    const arrayBufferView = new Uint8Array(xhr.response);
    const blob = new Blob([arrayBufferView], { type: 'image/jpg' });
    const urlCreator = window.URL || window.webkitURL;
    const blobUrl = urlCreator.createObjectURL(blob);
    callback(blobUrl);
  };

  xhr.send();
}

/* Fill size */
function containCropToCanvasDataURL(dataURL, callback) {
  const img = new Image();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 650;
  canvas.height = 650;
  img.onload = () => {
    const min = Math.min(img.width, img.height);
    ctx.drawImage(img,
      (img.width - min) / 2, (img.height - min) / 2, min, min,
      0, 0, 650, 650,
    );
    callback(canvas.toDataURL());
  };
  img.src = dataURL;
}

export function uploadCover(key, dataBase64Url) {
  return (dispatch) => {
    const blob = toBlob(dataBase64Url);
    const blobUrl = URL.createObjectURL(blob);
    dispatch(updatedCover(key, blobUrl));

    const formData = new FormData();
    formData.append('croppedImage', blob);

    asyncXhrPost(
      '/ajax/images/item_cover.json',
      formData,
    )
    .then((json) => {
      const { photoUrl } = json;
      s3ImageToBlob(photoUrl, (responseBlobUrl) => {
        dispatch(updatedCover(key, responseBlobUrl, photoUrl));
      });
    });
  };
}

// export function checkThumbsAndUpload() {
//   return (dispatch, getState) => {
//     const { coverThumbs } = getState().publish;
//     _.each(coverThumbs, (thumb) => {
//       containCropToCanvasDataURL(thumb.blobUrl, (dataURL) => {
//         dispatch(
//           uploadCoverAndUpdateThumbs(thumb.key, dataURL),
//         );
//       });
//     });
//   };
// }


// =============================================
// = reducer =
// =============================================
const initialThumb = {
  key: '?',
  blob: null,
  s3: null,
  isUploading: false,
  isStored: false,
};
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {

    case CREATE_COVER:
      return state.concat(
        Object.assign({}, initialThumb, {
          key: `KEY_${Date.now().toString()}`,
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
