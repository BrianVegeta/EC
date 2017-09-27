import { parseInt, trim } from 'lodash';
import { asyncXhrPost, asyncXhrAuthedPost } from 'lib/xhr';
import { now } from 'lib/time';
import {
  REDUCER_KEY as COVER_REDUCER_KEY,
  setupCoversForEdit,
} from './covers';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'PUBLISH.SPACE';
export const REDUCER_KEY = 'publishSpace';

/* enums */
export const ASSIGN_ADDRESS_BY_OWNER = '0';
export const ASSIGN_ADDRESS_BY_CUSTOMER = '1';

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

export const CHANGE_DATA = prefix('CHANGE_DATA');
export const FETCHED_FOR_EDIT = prefix('FETCHED_FOR_EDIT');
export const TOUCH_PATH = prefix('TOUCH_PATH');
export const RESET = prefix('RESET');
export const CHANGE_PAID_TYPE = prefix('CHANGE_PAID_TYPE');

// =============================================
// = actions =
// =============================================

export const changeData = data => ({
  type: CHANGE_DATA,
  data,
});

export const changePaidData = data => ({
  type: CHANGE_PAID_TYPE,
  data,
});

export const touchPath = path => ({
  type: TOUCH_PATH,
  path,
});

export const fetchedForEdit = data => ({
  type: FETCHED_FOR_EDIT,
  data,
});

export const reset = () => ({
  type: RESET,
});

/* transform fetched data to state */
const transformState = ({
  pname, pdes, city, area, cat_id, tags,
  assign_address, calculate_charge_type, price, deposit,
  ship_before_start_days, discounts, rules,
  cancel_policys,
}) => ({
  title: pname,
  descript: pdes,
  cityName: city,
  areaName: area,
  categoryID: parseInt(cat_id),
  tag1: tags[0],
  tag2: tags[1],
  tag3: tags[2],
  assignAddress: assign_address,
  chargeType: calculate_charge_type,
  price,
  deposit,
  reservationDays: ship_before_start_days,
  discounts,
  regulation: rules[0] || '',
  hasCancelPolicy: Boolean(cancel_policys[0]),
  advanceDay: cancel_policys[0] ? cancel_policys[0].advance_day : null,
  rate: cancel_policys[0] ? cancel_policys[0].rate : null,
});

export const editPublish = pid =>
  (dispatch) => {
    asyncXhrPost(
      '/ajax/item_detail.json',
      { pid },
    ).then((data) => {
      dispatch(fetchedForEdit(transformState(data)));
      dispatch(setupCoversForEdit(data)).then(() => {
      });
    }).catch(error => console.log(error));
  };

const transformParams = (covers, {
  title, descript, categoryID,
  cityName, areaName,
  tag1, tag2, tag3,
  price, deposit, reservationDays,
  assignAddress,
  chargeType, discounts,
  regulation,
  hasCancelPolicy,
  advanceDay,
  rate,
}) => {
  const rules = trim(regulation) === '' ? [] : [trim(regulation)];
  return {
    pname: title,
    img1: covers[0] && covers[0].s3,
    img2: covers[1] && covers[1].s3,
    img3: covers[2] && covers[2].s3,
    pdes: descript,
    cat_id: categoryID,
    city: cityName,
    area: areaName,
    price,
    deposit,
    currency: 'NTD',
    advance_reservation_days: reservationDays || 0,
    tag1: (tag1 || null),
    tag2: (tag2 || null),
    tag3: (tag3 || null),
    assign_address: assignAddress,
    calculate_charge_type: chargeType,
    discounts,
    rules,
    min_lease_days: 0,
    cancel_policys: hasCancelPolicy ? [{ advance_day: advanceDay, rate }] : null,
  };
};

export const savePublish = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const publish = getState()[REDUCER_KEY];
      const covers = getState()[COVER_REDUCER_KEY];
      asyncXhrAuthedPost(
        '/ajax/create_space_item.json',
        transformParams(covers, publish),
        getState(),
      ).then((data) => {
        resolve(data);
      }).catch(() => reject());
    });

export const updatePublish = pid =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const publish = getState()[REDUCER_KEY];
      const covers = getState()[COVER_REDUCER_KEY];
      asyncXhrAuthedPost(
        '/ajax/update_space_item.json',
        Object.assign({}, transformParams(covers, publish), { pid }),
        getState(),
      ).then((data) => {
        resolve(data);
      }).catch(() => reject());
    });

// =============================================
// = reducer =
// =============================================
const initialState = {
  touchedStepPaths: [],
  fetchedAt: null,
  /* ABOUT */
  title: '',
  descript: '',
  cityName: '',
  areaName: '',
  categoryID: null,
  tag1: '',
  tag2: '',
  tag3: '',
  /* DELIVERY */
  assignAddressByCustomer: false,
  assignAddressByOwner: true,
  assignAddress: '',
  /* PRICE */
  chargeType: '',
  price: null,
  deposits: null,
  discounts: [],
  reservationDays: 1,
  regulation: '',
  hasCancelPolicy: false,
  advanceDay: null,
  rate: null,
  /* TEST DATA */
  // title: 'title',
  // descript: 'afafaf',
  // cityName: '高雄市',
  // areaName: '苓雅區',
  // categoryID: 157,
  // tag1: 'AA',
  // tag2: '',
  // tag3: '',
  // assignAddressByCustomer: true,
  // assignAddressByOwner: true,
  // assignCity: '高雄市',
  // assignArea: '苓雅區',
  // assignAddress: '中正路一段',
  // chargeType: CHARGE_TYPE_FIX,
  // price: '3000',
  // deposit: '100',
  // startDate: moment(),
  // endDate: moment(),
  // unit: 2,
  // reservationDays: 5,
  // discount: '123',
  // regulation: 'afafa',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DATA:
      return Object.assign({}, state, action.data);

    case CHANGE_PAID_TYPE: {
      const resetData = Object.assign({}, action.data, {
        deposit: null,
        price: null,
        discounts: [],
        reservationDays: 1,
      });
      return Object.assign({}, state, resetData);
    }

    case TOUCH_PATH: {
      if (state.touchedStepPaths.includes(action.path)) {
        return state;
      }
      return Object.assign({}, state, {
        touchedStepPaths: state.touchedStepPaths.concat(action.path),
      });
    }

    case FETCHED_FOR_EDIT: {
      const newState = Object.assign({}, action.data, {
        fetchedAt: now(),
      });
      return Object.assign({}, state, newState);
    }

    case RESET:
      return initialState;

    default:
      return state;
  }
};
