/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes';

export const openEditorModal = image => ({
  type: TYPES.EDITOR_COVERS_OPEN_EDIT_MODAL,
  image,
});
export const cancelEditor = () => ({
  type: TYPES.EDITOR_COVERS_CANCEL_EDIT,
});
