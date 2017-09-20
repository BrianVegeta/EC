// import { asyncXhrPost } from 'lib/xhr';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'PUBLISH.CROPPER.USEDGOODS';


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

export const openCropper = (key, blob) => ({
  type: OPEN,
  blob,
  key,
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
        key: action.key,
      });

    case CLOSE:
      return initialState;

    case RESET:
      return initialState;

    default:
      return state;
  }
};
