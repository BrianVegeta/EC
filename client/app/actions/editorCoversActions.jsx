/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes';

export const openEditorModal = image => ({
  type: TYPES.EDITOR_COVERS_OPEN_EDIT_MODAL,
  image,
});
export const cancelEditor = () => ({
  type: TYPES.EDITOR_COVERS_CANCEL_EDIT,
});
export const setCroppedCanvas = data => ({
  type: TYPES.EDITOR_COVERS_GET_CROPPED_CANVAS,
  data,
});
// covers operations
export const newCoverWithBlob = blob => ({
  type: TYPES.EDITOR_COVERS_SET_IMAGE_BLOB,
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
