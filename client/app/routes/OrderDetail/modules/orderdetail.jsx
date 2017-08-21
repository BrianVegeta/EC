import { asyncXhrAuthedPost, asyncXhrAuthedGet } from 'lib/xhr';

/* =============================================>>>>>
= orderDetail =
===============================================>>>>>*/

const ACTION_PREFIX = 'ORDER.DETAIL';
const REDUCER_KEY = 'orderdetail';

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const FETCHING = prefix('FETCHING');
const FETCHING_IMAGE = prefix('FETCHING_IMAGES');
const FETCHED_ORDER = prefix('FETCHED_ORDER');
const FETCHED_BANKACC = prefix('FETCHED_BANKACC');
const FETCHED_OWNER = prefix('FETCHED_OWNER');
const FETCHED_LESSEE = prefix('FETCHED_LESSEE');
const FETCHED_IMAGES = prefix('FETCHED_IMAGES');
const FETCHED_LOGS = prefix('FETCHED_LOGS');
const FETCHED_SUE_DETAIL = prefix('FETCHED_SUE_DETAIL');
const RESET = prefix('RESET');

// =============================================
// = actions =
// =============================================
const fetching = () => ({
  type: FETCHING,
});

const fetchingImage = () => ({
  type: FETCHING_IMAGE,
});

const fetchedOrder = order => ({
  type: FETCHED_ORDER,
  order,
});

const fetchedBankAcc = result => ({
  type: FETCHED_BANKACC,
  result,
});


const fetchedOwner = userprofile => ({
  type: FETCHED_OWNER,
  userprofile,
});

const fetchedLessee = userprofile => ({
  type: FETCHED_LESSEE,
  userprofile,
});

const fetchedImages = images => ({
  type: FETCHED_IMAGES,
  images,
});

const fetchedLogs = logs => ({
  type: FETCHED_LOGS,
  logs,
});

const fetchedSueDetail = sueDetail => ({
  type: FETCHED_SUE_DETAIL,
  sueDetail,
});


export const reset = () => ({
  type: RESET,
});

export function fetchOrder(cid) {
  return (dispatch, getState) => {
    dispatch(fetching());
    asyncXhrAuthedPost(
      '/ajax/get_order.json',
      { cid },
      getState(),
    )
    .then((responseData) => {
      dispatch(fetchedOrder(responseData));
      const { type, owneruid, lesseeuid, contractstage } = responseData;

      asyncXhrAuthedPost(
        '/ajax/user_info.json',
        { isShowItem: false, uid: owneruid },
        getState(),
      )
      .then((responseUserData) => {
        dispatch(fetchedOwner(responseUserData));
      });

      asyncXhrAuthedPost(
        '/ajax/user_info.json',
        { isShowItem: false, uid: lesseeuid },
        getState(),
      )
      .then((responseUserData) => {
        dispatch(fetchedLessee(responseUserData));
      });
      if (contractstage < 4) {
        asyncXhrAuthedGet(
          '/ajax/bank/bankacc/ready.json',
          { },
          getState(),
        ).then((responseBankData) => {
          dispatch(fetchedBankAcc(responseBankData));
        });
      } else {
        asyncXhrAuthedPost(
          '/ajax/get_order_logs.json',
          { cid },
          getState(),
        )
        .then((responseLogData) => {
          dispatch(fetchedLogs(responseLogData));
        });
      }
      if (contractstage > 1000 && contractstage < 3000) {
        asyncXhrAuthedPost(
          '/ajax/get_sue_report.json',
          { cid },
          getState(),
        )
        .then((sueData) => {
          dispatch(fetchedSueDetail(sueData));
        });
      }
      // 只有物品及二手有圖片
      if (type === 'ITEM') {
        dispatch(fetchingImage());
        asyncXhrAuthedPost(
          '/ajax/get_order_images.json',
          { cid },
          getState(),
        )
        .then((responseImageData) => {
          dispatch(fetchedImages(responseImageData));
        });
      }
    });
  };
}

// =============================================
// = reducer =
// =============================================
const initialState = {
  isFetchingOwner: false,
  isFetchingLessee: false,
  isFetchingOrder: false,
  isFetchingImages: false,
  isFetchingLog: false,
  isFetchingBank: false,
  isFetchingSue: false,
  ownerProfile: null,
  lesseeProfile: null,
  sueDetail: null,
  bankReady: 0,
  order: null,
  logs: null,
  images: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, {
        isFetchingOrder: true,
        isFetchingBank: true,
        isFetchingOwner: true,
        isFetchingLessee: true,
      });

    case FETCHED_ORDER:
      return Object.assign({}, state, {
        isFetchingOrder: false,
        isFetchingOwner: true,
        isFetchingLessee: true,
        order: action.order,
      });
    case FETCHED_BANKACC:
      return Object.assign({}, state, {
        isFetchingOrder: false,
        bankReady: action.result,
      });

    case FETCHED_OWNER:
      return Object.assign({}, state, {
        isFetchingOwner: false,
        ownerProfile: action.userprofile.user_profile,
      });

    case FETCHED_LESSEE:
      return Object.assign({}, state, {
        isFetchingLessee: false,
        lesseeProfile: action.userprofile.user_profile,
      });

    case FETCHING_IMAGE:
      return Object.assign({}, state, {
        isFetchingImages: true,
      });

    case FETCHED_IMAGES:
      return Object.assign({}, state, {
        isFetchingImages: false,
        images: action.images,
      });

    case FETCHED_LOGS:
      return Object.assign({}, state, {
        isFetchingLogs: false,
        logs: action.logs,
      });

    case FETCHED_SUE_DETAIL:
      return Object.assign({}, state, {
        isFetchingSue: false,
        sueDetail: action.sueDetail,
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
