/* eslint-disable import/prefer-default-export */
import {
  PUBLISH_OEPN_CROPPER,
  PUBLISH_CLOSE_CROPPER,
} from '../constants/actionTypes';

export const openCropper = (key, blob) => ({
  type: PUBLISH_OEPN_CROPPER,
  blob,
  key,
});
export const closeCropper = () => ({
  type: PUBLISH_CLOSE_CROPPER,
});
