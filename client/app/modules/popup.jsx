/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'POPUP';

/* render types */
export const RENDER_BANK_SETUP = 'RENDER_BANK_SETUP';
export const RENDER_ACCESS_CHECK = 'RENDER_ACCESS_CHECK';
export const RENDER_PUBLISH_ENTRY = 'RENDER_PUBLISH_ENTRY';


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);
const OPEN = prefix('OPEN');
const CLOSE = prefix('CLOSE');


// =============================================
// = actions =
// =============================================

const openPopup = ({ renderType, options }) => ({
  type: OPEN,
  renderType,
  options,
});

export const closePopup = () => ({
  type: CLOSE,
});

export const popupBankInfoSetup = options =>
  openPopup({ renderType: RENDER_BANK_SETUP, options });

export const popupAccessCheck = options =>
  openPopup({ renderType: RENDER_ACCESS_CHECK, options });

export const popupPublishEntry = options =>
  openPopup({ renderType: RENDER_PUBLISH_ENTRY, options });


// =============================================
// = reducer =
// =============================================
const initialState = {
  isOpen: false,
  renderType: null,
  options: {},
};

export default (state = initialState, action) => {
  switch (action.type) {

    case OPEN:
      return Object.assign({}, state, {
        isOpen: true,
        renderType: action.renderType,
        options: action.options,
      });

    case CLOSE:
      return initialState;

    default:
      return state;
  }
};
