/* eslint-disable import/prefer-default-export */
import {
  map,
  filter,
} from 'lodash';


/* 分頁過濾重複資料 */
export const reduceDuplicateRecords = (newRecords, records, duplicateKey) => {
  const identities = map(records, record => record[duplicateKey]);
  return filter(newRecords, newRecord => !identities.includes(newRecord[duplicateKey]));
};

/**
 * transfer to blob
 *
 *
 * @type 'image/jpg'...
 *
 */
export const base64ToBlobData = (base64, type) => {
  const binStr = atob(base64.split(',')[1]);
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new Blob([arr], { type: (type || 'image/jpg') });
};

/**
 *
 * aws s3 to blob and then...
 * @s3 aws s3 url
 * @type 'image/jpg'...
 */
export const asyncS3ToBlob = (s3, type) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', s3);
    xhr.withCredentials = false;
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      const arrayBufferView = new Uint8Array(xhr.response);
      const blob = new Blob([arrayBufferView], { type: (type || 'image/jpg') });
      const urlCreator = window.URL || window.webkitURL;
      resolve(urlCreator.createObjectURL(blob));
    };
    xhr.onerror = e => reject(e);

    xhr.send();
  });

/**
 *
 * contain blob url on canvas and to base64
 *
 * @blob      blob url
 * @width     650
 * @blob      650
 * resove     base64
 */
export const asyncContainBlobTobase64 = (blob, isContain = true, width = 650, height = 650) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    img.onload = () => {
      const max = isContain ? Math.max(img.width, img.height) : Math.min(img.width, img.height);
      ctx.drawImage(
        img,
        (img.width - max) / 2, (img.height - max) / 2, max, max,
        0, 0, width, height,
      );
      resolve(canvas.toDataURL());
    };
    img.onerror = e => reject(e);
    img.src = blob;
  });

export const asyncBlobTobase64 = (blob, maxSize = 1280) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      const maxEdge = Math.max(img.width, img.height);
      let width = 0;
      let height = 0;
      if (maxEdge === img.width) {
        width = Math.min(maxEdge, maxSize);
        height = (width / img.width) * img.height;
      } else {
        height = Math.min(maxEdge, maxSize);
        width = (height / img.height) * img.width;
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
      resolve(canvas.toDataURL());
    };
    img.onerror = e => reject(e);
    img.src = blob;
  });


/**
 *
 * map sidebar steps
 *
 */
export const mapSidebarSteps = steps =>
  steps.map(([text, path, isValid]) => ({ text, path, isValid }));
