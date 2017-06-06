import coverCropper, { initialState as initialCoverCropper } from './publishCropper';
import coverThumbs from './publishThumbs';
import titleHandler, { initialState as initialTitle } from './publishTitle';
import descHandler, { initialState as initialDescript } from './publishDescript';
import {
  PUBLISH_OEPN_CROPPER,
  PUBLISH_CLOSE_CROPPER,

  PUBLISH_THUMBS_CREATE,
  PUBLISH_THUMBS_UPDATE_ORDERS,
  PUBLISH_THUMBS_REMOVE_ONE,
  PUBLISH_THUMBS_UPDATING_ONE,
  PUBLISH_THUMBS_UPDATED_ONE,

  PUBLISH_TITLE_UPDATE,
  PUBLISH_DESC_UPDATE,
  PUBLISH_CITY_AREA_UPDATE,
  PUBLISH_AMOUNT_UPDATE,
  PUBLISH_TAGS_UPDATE,
  PUBLISH_CATEGORY_UPDATE,

  PUBLISH_SHIP_DAYS_UPDATE,
  PUBLISH_SEND_OPTIONS_UPDATE,
  PUBLISH_RETURN_OPTIONS_UPDATE,
  PUBLISH_RETURN_ADDRESS_UPDATE_CITYAREA,
  PUBLISH_RETURN_ADDRESS_UPDATE_DETAIL,
  PUBLISH_CONTACT_NAME_UPDATE,
  PUBLISH_CONTACT_PHONE_UPDATE,

  PUBLISH_PRICE_UPDATE,
  PUBLISH_DEPOSIT_UPDATE,
  PUBLISH_MIN_LEASE_DAYS_UPDATE,
  PUBLISH_DISCOUNTS_UPDATE,


  PUBLISH_REGULATION_UPDATE,
  PUBLISH_CANCEL_POLICY_UPDATE,
  PUBLISH_CANCEL_POLICY_PURGE,
} from '../constants/actionTypes';

export const INDEX_RETURN_ADDRESSES_CITY = 0;
export const INDEX_RETURN_ADDRESSES_AREA = 1;
export const INDEX_RETURN_ADDRESSES_DETAIL = 2;
const initialState = {
  coverThumbs: [],
  coverCropper: initialCoverCropper,
  title: initialTitle,
  descript: initialDescript,
  city: '',
  area: '',
  amount: 1,
  hashtags: [null, null, null],
  categoryId: null,
  // Delivery
  shipBeforeStartDays: 1,
  sendOptions: '',
  returnOptions: '',
  returnAddresses: ['', '', ''],
  // ['宜蘭縣', '大同鄉', '中正一路']
  returnAddress: '',
  contactName: '',
  contactPhone: '',
  // price settings
  price: '100',
  deposit: '0',
  overduePercentagePerDay: 0, // %
  minLeaseDays: null,
  discounts: [], // { offer, days }

  // regulation
  regulation: '',
  cancelPolicy: null, // { advanceDays, rate }
};
function updateState(state, name, value) {
  const stateToUpdate = {};
  stateToUpdate[name] = value;
  return Object.assign({}, state, stateToUpdate);
}
export default (state = initialState, action) => {
  switch (action.type) {
    case PUBLISH_OEPN_CROPPER:
      return Object.assign({}, state, {
        coverCropper: coverCropper(state.coverCropper, action),
      });

    case PUBLISH_CLOSE_CROPPER:
      return Object.assign({}, state, {
        coverCropper: coverCropper(state.coverCropper, action),
      });

    case PUBLISH_THUMBS_CREATE:
      return Object.assign({}, state, {
        coverThumbs: coverThumbs(state.coverThumbs, action),
      });

    case PUBLISH_THUMBS_UPDATE_ORDERS:
      return Object.assign({}, state, {
        coverThumbs: coverThumbs(state.coverThumbs, action),
      });

    case PUBLISH_THUMBS_REMOVE_ONE:
      return Object.assign({}, state, {
        coverThumbs: coverThumbs(state.coverThumbs, action),
      });

    case PUBLISH_THUMBS_UPDATING_ONE:
      return Object.assign({}, state, {
        coverThumbs: coverThumbs(state.coverThumbs, action),
      });

    case PUBLISH_THUMBS_UPDATED_ONE:
      return Object.assign({}, state, {
        coverThumbs: coverThumbs(state.coverThumbs, action),
      });

    case PUBLISH_TITLE_UPDATE:
      return Object.assign({}, state, {
        title: titleHandler(state.title, action),
      });

    case PUBLISH_DESC_UPDATE:
      return Object.assign({}, state, {
        descript: descHandler(state.descript, action),
      });

    case PUBLISH_CITY_AREA_UPDATE:
      return Object.assign({}, state, {
        city: action.city, area: action.area,
      });

    case PUBLISH_AMOUNT_UPDATE:
      return Object.assign({}, state, {
        amount: action.amount,
      });

    case PUBLISH_TAGS_UPDATE:
      return Object.assign({}, state, {
        hashtags: action.hashtags,
      });

    case PUBLISH_CATEGORY_UPDATE:
      return Object.assign({}, state, {
        categoryId: action.categoryId,
      });
    case PUBLISH_SHIP_DAYS_UPDATE:
      return Object.assign({}, state, {
        shipBeforeStartDays: action.shipBeforeStartDays,
      });

    case PUBLISH_SEND_OPTIONS_UPDATE: {
      return Object.assign({}, state, {
        sendOptions: action.options,
      });
    }
    case PUBLISH_RETURN_OPTIONS_UPDATE: {
      return Object.assign({}, state, {
        returnOptions: action.options,
      });
    }
    case PUBLISH_CONTACT_NAME_UPDATE:
      return updateState(state, 'contactName', action.name);

    case PUBLISH_CONTACT_PHONE_UPDATE:
      return updateState(state, 'contactPhone', action.phone);

    case PUBLISH_RETURN_ADDRESS_UPDATE_CITYAREA: {
      const { city, area } = action;
      const returnAddresses = state.returnAddresses.concat();
      returnAddresses[INDEX_RETURN_ADDRESSES_CITY] = city;
      returnAddresses[INDEX_RETURN_ADDRESSES_AREA] = area;
      const returnAddress = returnAddresses.join('');
      return Object.assign({}, state, {
        returnAddresses, returnAddress,
      });
    }
    case PUBLISH_RETURN_ADDRESS_UPDATE_DETAIL: {
      const { detail } = action;
      const returnAddresses = state.returnAddresses.concat();
      returnAddresses[INDEX_RETURN_ADDRESSES_DETAIL] = detail;
      const returnAddress = returnAddresses.join('');
      return Object.assign({}, state, {
        returnAddresses, returnAddress,
      });
    }
    case PUBLISH_PRICE_UPDATE:
      return Object.assign({}, state, { price: action.price });

    case PUBLISH_DEPOSIT_UPDATE:
      return Object.assign({}, state, { deposit: action.deposit });

    case PUBLISH_MIN_LEASE_DAYS_UPDATE:
      return Object.assign({}, state, { minLeaseDays: action.minLeaseDays });

    case PUBLISH_DISCOUNTS_UPDATE:
      return Object.assign({}, state, { discounts: action.discounts });

    case PUBLISH_REGULATION_UPDATE:
      return Object.assign({}, state, { regulation: action.regulation });

    case PUBLISH_CANCEL_POLICY_UPDATE: {
      const { advanceDays, rate } = action;
      return Object.assign({}, state, {
        cancelPolicy: { advanceDays, rate },
      });
    }

    case PUBLISH_CANCEL_POLICY_PURGE:
      return Object.assign({}, state, { cancelPolicy: null });

    default:
      return state;
  }
};
