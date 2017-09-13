import { parseInt } from 'lodash';
import { asyncXhrPost, asyncXhrAuthedPost } from 'lib/xhr';
import { now } from 'lib/time';
import {
  REDUCER_KEY as COVER_REDUCER_KEY,
  setupCoversForEdit,
} from './covers';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'PUBLISH';
export const REDUCER_KEY = 'publish';

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


// =============================================
// = actions =
// =============================================

export const changeData = data => ({
  type: CHANGE_DATA,
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
  calculate_charge_type, price, unit,
  ship_before_start_days, discounts,
  send_option,
}) => {
  const discount = discounts[0] ? discounts[0].discount : '';
  return ({
    title: pname,
    descript: pdes,
    cityName: city,
    areaName: area,
    categoryID: parseInt(cat_id),
    tag1: tags[0],
    tag2: tags[1],
    tag3: tags[2],
    sendBy711: (send_option.search('2') !== -1),
    sendByOtherShippment: (send_option.search('1') !== -1),
    sendByInPerson: (send_option.search('0') !== -1),
    minimumShippemntDay: ship_before_start_days,
    chargeType: calculate_charge_type,
    price,
    unit,
    reservationDays: ship_before_start_days,
    discount,
    discounts,
  });
};

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
  unit, price, reservationDays,
  chargeType,
  sendBy711,
  sendByOtherShippment,
  sendByInPerson,
  minimumShippemntDay,
}) => {
  let sendOption = '';
  if (sendByInPerson) sendOption = sendOption.concat('0');
  if (sendByOtherShippment) sendOption = sendOption.concat('1');
  if (sendBy711) sendOption = sendOption.concat('2');
  return ({
    pname: title,
    img1: covers[0] && covers[0].s3,
    img2: covers[1] && covers[1].s3,
    img3: covers[2] && covers[2].s3,
    pdes: descript,
    cat_id: categoryID,
    city: cityName,
    area: areaName,
    unit,
    price,
    currency: 'NTD',
    advance_reservation_days: reservationDays || 0,
    tag1: (tag1 || null),
    tag2: (tag2 || null),
    tag3: (tag3 || null),
    send_option: sendOption,
    ship_before_start_days: minimumShippemntDay,
    calculate_charge_type: chargeType,
    min_lease_days: 0,
  });
};

export const savePublish = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const publish = getState()[REDUCER_KEY];
      const covers = getState()[COVER_REDUCER_KEY];
      asyncXhrAuthedPost(
        '/ajax/create_used_goods_item.json',
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
        '/ajax/update_used_goods_item.json',
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
  sendBy711: false,
  sendByOtherShippment: false,
  sendByInPerson: false,
  returnBy711: false,
  returnByOtherShippment: false,
  returnByInPerson: false,
  minimumShippemntDay: 1,
  returnCity: '',
  returnArea: '',
  returnAddress: '',
  /* PRICE */
  chargeType: 'days',
  price: null,
  discounts: [],
  unit: 0,
  reservationDays: 1,
  discount: '',
  storeid: '',
  storename: '',
  storeaddress: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DATA:
      return Object.assign({}, state, action.data);

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
