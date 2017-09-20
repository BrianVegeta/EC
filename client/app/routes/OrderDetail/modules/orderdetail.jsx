/* eslint-disable camelcase */
import { asyncXhrAuthedPost } from 'lib/xhr';
import { asyncCheckReady } from 'modules/personalBankInfo';
import { setupCoversForEdit } from './ordergallery';
import {
  OWNER_SEND,
  LESSEE_RECEIVE,
  LESSEE_SEND,
  OWNER_RECEIVE,
} from './orderaction';

/* =============================================>>>>>
= orderDetail =
===============================================>>>>>*/

const ACTION_PREFIX = 'ORDER.DETAIL';
// const REDUCER_KEY = 'orderdetail';

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const FETCHING = prefix('FETCHING');
const FETCHING_IMAGE = prefix('FETCHING_IMAGES');
const UPDATING_IMAGE = prefix('UPDATING_IMAGE');
const FETCHED_ORDER = prefix('FETCHED_ORDER');
const FETCHED_OWNER = prefix('FETCHED_OWNER');
const FETCHED_LESSEE = prefix('FETCHED_LESSEE');
const FETCHED_SEND_SEVEN = prefix('FETCHED_SEND_SEVEN');
const FETCHED_RETURN_SEVEN = prefix('FETCHED_RETURN_SEVEN');
const FETCHED_IMAGES = prefix('FETCHED_IMAGES');
const UPDATE_IMAGES = prefix('UPDATE_IMAGES');
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

const fetchedOwner = userprofile => ({
  type: FETCHED_OWNER,
  userprofile,
});

const fetchedLessee = userprofile => ({
  type: FETCHED_LESSEE,
  userprofile,
});

const fetchedImages = (images, uploadImgType) => ({
  type: FETCHED_IMAGES,
  images,
  uploadImgType,
});

const fetchedLogs = logs => ({
  type: FETCHED_LOGS,
  logs,
});

const fetchedSueDetail = sueDetail => ({
  type: FETCHED_SUE_DETAIL,
  sueDetail,
});

export const updatingImage = () => ({
  type: UPDATING_IMAGE,
});

export const updateImages = (imgType, images) => ({
  type: UPDATE_IMAGES,
  imgType,
  images,
});

export const fetchedSendSeven = ShipOrder => ({
  type: FETCHED_SEND_SEVEN,
  ShipOrder,
});

export const fetchedReturnSeven = ShipOrder => ({
  type: FETCHED_RETURN_SEVEN,
  ShipOrder,
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
      const screenStage = contractstage % 100;
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

      asyncXhrAuthedPost(
        '/ajax/send_read.json',
        {
          cid,
          type: 'ME_READ',
        },
        getState(),
      );

      if (screenStage < 4) {
        dispatch(asyncCheckReady());
      } else {
        if (type === 'ITEM') {
          dispatch(fetchingImage());
          asyncXhrAuthedPost(
            '/ajax/get_order_images.json',
            { cid },
            getState(),
          )
          .then((responseImageData) => {
            const { display } = responseData;
            const { can_camera, can_ship, can_711, can_ship_confirm,
              can_return, can_711_return, can_return_confirm } = display;
            let uploadImgType = null;
            if (can_camera) {
              let images = [];
              if (can_ship_confirm) {
                uploadImgType = LESSEE_RECEIVE;
                images = responseImageData.LESSEE_RECEIVE;
              } else if (can_711 || can_ship) {
                uploadImgType = OWNER_SEND;
                images = responseImageData.OWNER_SEND;
              } else if (can_return_confirm) {
                uploadImgType = OWNER_RECEIVE;
                images = responseImageData.OWNER_RECEIVE;
              } else if (can_711_return || can_return) {
                uploadImgType = LESSEE_SEND;
                images = responseImageData.LESSEE_SEND;
              }
              if (uploadImgType && images) {
                const img1 = images.length > 0 ? images[0] : null;
                const img2 = images.length > 1 ? images[1] : null;
                dispatch(setupCoversForEdit({ img1, img2 }));
              }
            }
            dispatch(fetchedImages(responseImageData, uploadImgType));
          });
        }

        if (responseData.send_type === '2') {
          asyncXhrAuthedPost(
            '/ajax/get_ship_order.json',
            {
              cid,
              send_type: 'OWNER_SEND',
            },
            getState(),
          )
          .then((sendSeven) => {
            dispatch(fetchedSendSeven(sendSeven));
          });
        }

        if (screenStage > 8 && responseData.return_type === '2') {
          asyncXhrAuthedPost(
            '/ajax/get_ship_order.json',
            {
              cid,
              send_type: 'LESSEE_SEND',
            },
            getState(),
          )
          .then((returnSeven) => {
            dispatch(fetchedReturnSeven(returnSeven));
          });
        }

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
  isUpdatingImages: false,
  isFetchingLog: false,
  isFetchingSue: false,
  ownerProfile: null,
  sendSeven: null,
  lesseeProfile: null,
  returnSeven: null,
  sueDetail: null,
  order: null,
  logs: [],
  images: null,
  uploadImgType: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, {
        isFetchingOrder: true,
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
        uploadImgType: action.uploadImgType,
        isFetchingImages: false,
        images: {
          beforeShip: action.images.OWNER_SEND,
          afterShip: action.images.LESSEE_RECEIVE,
          beforeReturn: action.images.LESSEE_SEND,
          afterReturn: action.images.OWNER_RECEIVE,
        },
      });
    case UPDATING_IMAGE:
      return Object.assign({}, state, {
        isUpdatingImages: true,
      });
    case UPDATE_IMAGES:
      if (!state.images) {
        return Object.assign({}, state, {
          isUpdatingImages: false,
        });
      }
      switch (action.imgType) {
        case OWNER_SEND:
          return Object.assign({}, state, {
            isUpdatingImages: false,
            images: {
              beforeShip: action.images,
              afterShip: state.images.LESSEE_RECEIVE,
              beforeReturn: state.images.LESSEE_SEND,
              afterReturn: state.images.OWNER_RECEIVE,
            },
          });
        case LESSEE_RECEIVE:
          return Object.assign({}, state, {
            isUpdatingImages: false,
            images: {
              beforeShip: state.images.OWNER_SEND,
              afterShip: action.images,
              beforeReturn: state.images.LESSEE_SEND,
              afterReturn: state.images.OWNER_RECEIVE,
            },
          });
        case LESSEE_SEND:
          return Object.assign({}, state, {
            isUpdatingImages: false,
            images: {
              beforeShip: state.images.OWNER_SEND,
              afterShip: state.images.LESSEE_RECEIVE,
              beforeReturn: action.images,
              afterReturn: state.images.OWNER_RECEIVE,
            },
          });
        case OWNER_RECEIVE:
          return Object.assign({}, state, {
            isUpdatingImages: false,
            images: {
              beforeShip: state.images.OWNER_SEND,
              afterShip: state.images.LESSEE_RECEIVE,
              beforeReturn: state.images.LESSEE_SEND,
              afterReturn: action.images,
            },
          });
        default:
          return Object.assign({}, state, {
            isUpdatingImages: false,
          });
      }

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

    case FETCHED_SEND_SEVEN:
      return Object.assign({}, state, {
        sendSeven: action.ShipOrder,
      });

    case FETCHED_RETURN_SEVEN:
      return Object.assign({}, state, {
        returnSeven: action.ShipOrder,
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
