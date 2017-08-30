/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'POPUP';

/* render types */
export const RENDER_BANK_SETUP = 'RENDER_BANK_SETUP';
export const RENDER_ACCESS_CHECK = 'RENDER_ACCESS_CHECK';
export const RENDER_PUBLISH_ENTRY = 'RENDER_PUBLISH_ENTRY';
export const RENDER_SCORE_RATING = 'RENDER_SCORE_RATING';
export const RENDER_SUE_DETAIL = 'RENDER_SUE_DETAIL';
export const RENDER_LOGIN = 'RENDER_LOGIN';
// export const RENDER_TWO_BUTTONS = 'RENDER_TWO_BUTTONS';
export const RENDER_SHOW_WISH = 'RENDER_SHOW_WISH';

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

export const popupScoreRating = options =>
  openPopup({ renderType: RENDER_SCORE_RATING, options });

export const popupSueDetail = options =>
  openPopup({ renderType: RENDER_SUE_DETAIL, options });

export const popupLogin = options =>
  openPopup({ renderType: RENDER_LOGIN, options });

// export const popupTwoButtons = options =>
//   openPopup({ renderType: RENDER_TWO_BUTTONS, options });

export const popupShowWish = options =>
  openPopup({ renderType: RENDER_SHOW_WISH, options });


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
