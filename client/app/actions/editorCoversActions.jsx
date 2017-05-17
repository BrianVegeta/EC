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
export function uploadCover(formData) {
  return (dispatch, getState) => {
    const { routesHelper } = getState();
    fetch(routesHelper.ajax.itemCover, {
      ...UPLOAD_PUT,
      body: formData,
    })
    .then(response => response.json())
    .then((json) => {
      console.log(json);
    })
    .catch((err) => { throw err; });
  };
}
