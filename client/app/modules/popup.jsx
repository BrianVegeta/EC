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
export const RENDER_SHOW_WISH = 'RENDER_SHOW_WISH';
export const RENDER_ATM = 'RENDER_ATM';
export const RENDER_REPORT = 'RENDER_REPORT';
export const RENDER_SEVEN_NO = 'RENDER_SEVEN_NO';
export const RENDER_SEVEN_LOG = 'RENDER_SEVEN_LOG';
// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);
const FETCHING = prefix('FETCHING');
const FETCHED = prefix('FETCHED');
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

export const popupShowWish = options =>
  openPopup({ renderType: RENDER_SHOW_WISH, options });

export const popupATMBank = options =>
  openPopup({ renderType: RENDER_ATM, options });

export const popupReport = options =>
  openPopup({ renderType: RENDER_REPORT, options });

export const popupSevenNo = options =>
  openPopup({ renderType: RENDER_SEVEN_NO, options });

export const popupSevenLog = options =>
  openPopup({ renderType: RENDER_SEVEN_LOG, options });


export const popupFetching = () => ({
  type: FETCHING,
});

export const popupFetched = options => ({
  type: FETCHED,
  options,
});

export function closeCallback() {
  return dispatch =>
    new Promise((resolve) => {
      dispatch(closePopup());
      resolve();
    });
}


// =============================================
// = reducer =
// =============================================
const initialState = {
  isOpen: false,
  renderType: null,
  isFetching: false,
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

    case FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        options: action.options,
      });

    default:
      return state;
  }
};
