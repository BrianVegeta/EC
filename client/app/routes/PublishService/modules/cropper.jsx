// import { asyncXhrPost } from 'lib/xhr';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'PUBLISH.CROPPER';


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const OPEN = prefix('OPEN');
const CLOSE = prefix('CLOSE');


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

    default:
      return state;
  }
};
