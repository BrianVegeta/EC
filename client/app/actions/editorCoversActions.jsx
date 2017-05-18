/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes';
import { UPLOAD_PUT } from './methods';

export const openEditorModal = (key, cover) => ({
  type: TYPES.EDITOR_COVERS_OPEN_EDIT_MODAL,
  key,
  cover,
});
export const cancelEditor = () => ({
  type: TYPES.EDITOR_COVERS_CANCEL_EDIT,
});
// covers operations
export const newCoverWithBlob = blob => ({
  type: TYPES.EDITOR_COVERS_NEW_COVER_WITH_BLOB,
  blob,
});
export const updateCovers = covers => ({
  type: TYPES.EDITOR_COVERS_UPDATE_COVERS,
  covers,
});
export const removeCover = key => ({
  type: TYPES.EDITOR_COVERS_REMOVE_COVER,
  key,
});
export const updatingCover = (key, blob) => ({
  type: TYPES.EDITOR_COVERS_UPDATING_COVER,
  blob,
  key,
});
export const updatedCover = (key, blob) => ({
  type: TYPES.EDITOR_COVERS_UPDATED_COVER,
  blob,
  key,
});

function toBlob(dataBase64, type) {
  const binStr = atob(dataBase64.split(',')[1]);
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new Blob([arr], { type: (type || 'image/jpg') });
}

export function uploadCover(dataBase64, callback) {
  return (dispatch, getState) => {
    const { routesHelper } = getState();
    const formData = new FormData();
    formData.append('croppedImage', toBlob(dataBase64));
    fetch(routesHelper.ajax.itemCover, {
      ...UPLOAD_PUT,
      body: formData,
    })
    .then(response => response.json())
    .then((json) => {
      callback(json.photoUrl);
      console.log('updated');
    })
    .catch((err) => { throw err; });
  };
}
