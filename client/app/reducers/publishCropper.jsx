import {
  PUBLISH_OEPN_CROPPER,
  PUBLISH_CLOSE_CROPPER,
} from '../constants/actionTypes';


export const initialState = {
  blob: null, key: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case PUBLISH_OEPN_CROPPER:
      return Object.assign({}, state, {
        blob: action.blob,
        key: action.key,
      });

    case PUBLISH_CLOSE_CROPPER:
      return initialState;

    default:
      return state;
  }
};
