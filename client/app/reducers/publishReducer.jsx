import coverCropper, { initialState as initialCoverCropper } from './publishCropper';
import coverThumbs from './publishThumbs';
import titleHandler, { initialState as initialTitle } from './publishTitle';
import descHandler, { initialState as initialDescript } from './publishDescript';
import { insertOption, removeOption } from './publishOptions';
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

  PUBLISH_SEND_OPTIONS_UPDATE,
  PUBLISH_RETURN_OPTIONS_UPDATE,
  PUBLISH_RETURN_ADDRESS_UPDATE_CITYAREA,
  PUBLISH_RETURN_ADDRESS_UPDATE_DETAIL,

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
  sendOptions: '',
  returnOptions: '',
  returnAddresses: ['', '', ''],
  // ['宜蘭縣', '大同鄉', '中正一路']
  returnAddress: '',
  // price settings
  price: '100',
  deposit: '0',
  minLeaseDays: null,
  discounts: [],

  // regulation
  regulation: '',
  cancelPolicy: null, // { advanceDays, rate }
};
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
        amount: action.amont,
      });

    case PUBLISH_TAGS_UPDATE:
      return Object.assign({}, state, {
        hashtags: action.hashtags,
      });

    case PUBLISH_CATEGORY_UPDATE:
      return Object.assign({}, state, {
        categoryId: action.categoryId,
      });

    case PUBLISH_SEND_OPTIONS_UPDATE: {
      const { optionKey, isChecked } = action;
      const handleOptions = isChecked ? insertOption : removeOption;
      return Object.assign({}, state, {
        sendOptions: handleOptions(state.sendOptions, optionKey),
      });
    }
    case PUBLISH_RETURN_OPTIONS_UPDATE: {
      const { optionKey, isChecked } = action;
      const handleOptions = isChecked ? insertOption : removeOption;
      return Object.assign({}, state, {
        returnOptions: handleOptions(state.returnOptions, optionKey),
      });
    }
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
