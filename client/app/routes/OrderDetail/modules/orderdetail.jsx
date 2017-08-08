import { asyncXhrAuthedPost } from 'lib/xhr';


// =============================================
// = action type =
// =============================================
const prefix = action => (`ORDERDETAIL.${action}`);

export const FETCHING = prefix('FETCHING');
export const FETCHING_IMAGE = prefix('FETCHING_IMAGES');
export const FETCHED_ORDER = prefix('FETCHED_ORDER');
export const FETCHED_OWNER = prefix('FETCHED_OWNER');
export const FETCHED_LESSEE = prefix('FETCHED_LESSEE');
export const FETCHED_IMAGES = prefix('FETCHED_IMAGES');
export const FETCHED_LOGS = prefix('FETCHED_LOGS');

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

const fetchedImages = images => ({
  type: FETCHED_IMAGES,
  images,
});

const fetchedLogs = logs => ({
  type: FETCHED_LOGS,
  logs,
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
      const { type, owneruid, lesseeuid } = responseData;
      console.log(responseData);
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
        '/ajax/get_order_logs.json',
        { cid },
        getState(),
      )
      .then((responseLogData) => {
        console.log(responseLogData);
        dispatch(fetchedLogs(responseLogData));
      });

      // 只有物品及二手有圖片
      if (type === 'ITEM') {
        dispatch(fetchingImage());
        asyncXhrAuthedPost(
          '/ajax/get_order_images.json',
          { cid },
          getState(),
        )
        .then((responseImageData) => {
          console.log(responseImageData);
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
  ownerProfile: null,
  lesseeProfile: null,
  order: null,
  logs: null,
  images: null,
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
        isFetchingImages: false,
        images: action.images,
      });

    case FETCHED_LOGS:
      return Object.assign({}, state, {
        isFetchingLogs: false,
        logs: action.logs,
      });

    default:
      return state;
  }
};
