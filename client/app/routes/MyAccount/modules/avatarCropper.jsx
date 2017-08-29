/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'MY.PROFILE.CROPPER';
export const REDUCER_KEY = 'avatarCropper';


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const OPEN = prefix('OPEN');
const CLOSE = prefix('CLOSE');
const RESET = prefix('RESET');


// =============================================
// = actions =
// =============================================

export const openCropper = blob => ({
  type: OPEN,
  blob,
});

export const closeCropper = () => ({
  type: CLOSE,
});

export const reset = () => ({
  type: RESET,
});


// =============================================
// = reducer =
// =============================================
export const initialState = {
  blob: null, key: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN:
      return Object.assign({}, state, {
        blob: action.blob,
      });

    case CLOSE:
      return initialState;

    case RESET:
      return initialState;

    default:
      return state;
  }
};
