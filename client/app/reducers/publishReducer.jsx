import coverCropper, { initialState as initialCoverCropper } from './publishCropper';
import coverThumbs from './publishThumbs';
import titleHandler, { initialState as initialTitle } from './publishTitle';
import descHandler, { initialState as initialDescript } from './publishDescript';
import {
  PUBLISH_PROGRESS_UPDATE,
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

  PUBLISH_APPOINTMENT_PRIOR_UPDATE, // @@service
  PUBLISH_ASSIGNMENT_OPTIONS_UPDATE, // @@service
  PUBLISH_ASSIGN_CITYAREA_UPDATE, // @@service
  PUBLISH_ASSIGN_ADDRESS_UPDATE, // @@service
  PUBLISH_DATES_RANGE_UPDATE, // @@ service
  PUBLISH_SHIP_DAYS_UPDATE,
  PUBLISH_SEND_OPTIONS_UPDATE,
  PUBLISH_RETURN_OPTIONS_UPDATE,
  PUBLISH_RETURN_ADDRESS_UPDATE_CITYAREA,
  PUBLISH_RETURN_ADDRESS_UPDATE_DETAIL,
  PUBLISH_CONTACT_NAME_UPDATE,
  PUBLISH_CONTACT_PHONE_UPDATE,
  PUBLISH_SERVICE_DISCOUNT_UPDATE, // @@ service
  // STEP4 PRICE
  PUBLISH_CHARGE_TYPE_UPDATE, // @@service
  PUBLISH_START_DATE_UPDATE,
  PUBLISH_END_DATE_UPDATE,
  PUBLISH_PRICE_UPDATE,
  PUBLISH_DEPOSIT_UPDATE,
  PUBLISH_OVERDUE_POLICY_UPDATE,
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
  progress: {},
  coverThumbs: [],
  coverCropper: initialCoverCropper,
  title: initialTitle,
  descript: initialDescript,
  city: '',
  area: '',
  amount: 1,
  hashtags: [null, null, null],
  categoryId: null,
  // STEP 3 DELIVERY
  appointmentPrior: 1, // @@service
  assignmentOptions: '', // @@service
  assignCity: '', // @@service
  assignArea: '', // @@service
  assignAddress: '', // @@service
  // STEP 4 PRICE
  chargeType: null, // @@service
  startDate: null, // momentObj @@service
  endDate: null, // momentObj @@service
  shipBeforeStartDays: 1,
  sendOptions: '',
  returnOptions: '',
  returnAddresses: ['', '', ''],
  // ['宜蘭縣', '大同鄉', '中正一路']
  returnAddress: '',
  contactName: '',
  contactPhone: '',
  // Step 4 price
  price: '100',
  deposit: '0',
  overduePercentagePerDay: 0, // %
  minLeaseDays: null,
  discounts: [], // { offer, days }
  serviceDiscount: null,

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
    case PUBLISH_PROGRESS_UPDATE: {
      const progress = state.progress;
      progress[action.step] = true;
      return Object.assign({}, state, { progress });
    }
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

    case PUBLISH_APPOINTMENT_PRIOR_UPDATE:
      return updateState(state, 'appointmentPrior', action.days);

    case PUBLISH_ASSIGNMENT_OPTIONS_UPDATE:
      return updateState(state, 'assignmentOptions', action.options);

    case PUBLISH_ASSIGN_CITYAREA_UPDATE:
      return Object.assign({}, state, {
        assignCity: action.city,
        assignArea: action.area,
      });

    case PUBLISH_ASSIGN_ADDRESS_UPDATE:
      return updateState(state, 'assignAddress', action.address);

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
    // STEP4 PRICE
    case PUBLISH_CHARGE_TYPE_UPDATE:
      return updateState(state, 'chargeType', action.chargeType);

    case PUBLISH_START_DATE_UPDATE:
      return updateState(state, 'startDate', action.startDate);

    case PUBLISH_END_DATE_UPDATE:
      return updateState(state, 'endDate', action.endDate);

    case PUBLISH_DATES_RANGE_UPDATE: {
      const { startDate, endDate } = action;
      return Object.assign({}, state, { startDate, endDate });
    }

    case PUBLISH_PRICE_UPDATE:
      return Object.assign({}, state, { price: action.price });

    case PUBLISH_DEPOSIT_UPDATE:
      return Object.assign({}, state, { deposit: action.deposit });

    case PUBLISH_OVERDUE_POLICY_UPDATE:
      return updateState(state, 'overduePercentagePerDay', action.percentage);

    case PUBLISH_MIN_LEASE_DAYS_UPDATE:
      return Object.assign({}, state, { minLeaseDays: action.minLeaseDays });

    case PUBLISH_DISCOUNTS_UPDATE:
      return Object.assign({}, state, { discounts: action.discounts });

    case PUBLISH_SERVICE_DISCOUNT_UPDATE:
      return updateState(state, 'serviceDiscount', action.discount);

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
