/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import {
  PUBLISH_THUMBS_CREATE,
  PUBLISH_THUMBS_UPDATE_ORDERS,
  PUBLISH_THUMBS_REMOVE_ONE,
  PUBLISH_THUMBS_UPDATING_ONE,
  PUBLISH_THUMBS_UPDATED_ONE,
} from '../constants/actionTypes';
import { UPLOAD_PUT } from './methods';

// private funcs
function toBlob(dataBase64, type) {
  const binStr = atob(dataBase64.split(',')[1]);
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new Blob([arr], { type: (type || 'image/jpg') });
}
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

export const thumbCreate = blobUrl => ({
  type: PUBLISH_THUMBS_CREATE,
  blobUrl,
});
export const thumbsUpdateOrders = thumbs => ({
  type: PUBLISH_THUMBS_UPDATE_ORDERS,
  thumbs,
});
export const removeFromThumbs = key => ({
  type: PUBLISH_THUMBS_REMOVE_ONE,
  key,
});
export const updatingFromThumbs = (key, blobUrl) => ({
  type: PUBLISH_THUMBS_UPDATING_ONE,
  blobUrl,
  key,
});
export const updatedFromThumbs = (key, blobUrl, s3Url) => ({
  type: PUBLISH_THUMBS_UPDATED_ONE,
  blobUrl,
  s3Url,
  key,
});

export function uploadCoverAndUpdateThumbs(key, dataBase64Url) {
  return (dispatch, getState) => {
    const blob = toBlob(dataBase64Url);
    const blobUrl = URL.createObjectURL(blob);
    dispatch(updatingFromThumbs(key, blobUrl));

    const { routesHelper } = getState();
    const formData = new FormData();
    formData.append('croppedImage', blob);
    fetch(routesHelper.ajax.itemCover, {
      ...UPLOAD_PUT,
      body: formData,
    })
    .then(response => response.json())
    .then((json) => {
      const { photoUrl } = json;
      s3ImageToBlob(photoUrl, (responseBlobUrl) => {
        dispatch(updatedFromThumbs(key, responseBlobUrl, photoUrl));
      });
    })
    .catch((err) => { throw err; });
  };
}

export function checkThumbsAndUpload() {
  return (dispatch, getState) => {
    const { coverThumbs } = getState().publish;
    _.each(coverThumbs, (thumb) => {
      containCropToCanvasDataURL(thumb.blobUrl, (dataURL) => {
        dispatch(
          uploadCoverAndUpdateThumbs(thumb.key, dataURL),
        );
      });
    });
  };
}
