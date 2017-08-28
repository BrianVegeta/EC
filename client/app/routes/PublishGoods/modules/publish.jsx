import { parseInt } from 'lodash';
import { asyncXhrPost, asyncXhrAuthedPost } from 'lib/xhr';
import { now, getMoment } from 'lib/time';
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
export const CHARGE_TYPE_FIX = 'fix';
export const CHARGE_TYPE_COUNT = 'count';
export const CHARGE_TYPE_DAY = 'day';

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
  // assign_address_type, assign_city, assign_area, assign_address,
  calculate_charge_type, price, deposit, unit,
  ship_before_start_days, discounts, rules,
  overdue_rate, send_option, return_option,
  return_city, return_area, return_address,
}) => {
  // const assignAddressByCustomer =
  //   assign_address_type.indexOf(ASSIGN_ADDRESS_BY_CUSTOMER) >= 0;
  // const assignAddressByOwner =
  //   assign_address_type.indexOf(ASSIGN_ADDRESS_BY_OWNER) >= 0;
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
    returnBy711: (return_option.search('2') !== -1),
    returnByOtherShippment: (return_option.search('1') !== -1),
    returnByInPerson: (return_option.search('0') !== -1),
    minimumShippemntDay: ship_before_start_days,
    // assignAddressByCustomer,
    // assignAddressByOwner,
    returnCity: return_city,
    returnArea: return_area,
    returnAddress: return_address,
    chargeType: calculate_charge_type,
    price,
    deposit,
    unit,
    reservationDays: ship_before_start_days,
    discount,
    discounts,
    regulation: rules[0] || '',
    hasOverduePolicy: (overdue_rate > 0),
    overdueRate: overdue_rate,
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
  unit, price, deposit, reservationDays,
  // assignAddressByOwner, assignAddressByCustomer,
  returnCity, returnArea, returnAddress,
  // startDate, endDate,
  chargeType, discounts,
  regulation,
  hasOverduePolicy,
  overdueRate,
  sendBy711,
  sendByOtherShippment,
  sendByInPerson,
  returnBy711,
  returnByOtherShippment,
  returnByInPerson,
  minimumShippemntDay,
}) => {
  // const assignTypes = [];
  let sendOption = '';
  let returnOption = '';
  if (sendByInPerson) sendOption = sendOption.concat('0');
  if (sendByOtherShippment) sendOption = sendOption.concat('1');
  if (sendBy711) sendOption = sendOption.concat('2');
  if (returnByInPerson) returnOption = returnOption.concat('0');
  if (returnByOtherShippment) returnOption = returnOption.concat('1');
  if (returnBy711) returnOption = returnOption.concat('2');
  // if (assignAddressByOwner) assignTypes.push(ASSIGN_ADDRESS_BY_OWNER);
  // if (assignAddressByCustomer) assignTypes.push(ASSIGN_ADDRESS_BY_CUSTOMER);
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
    deposit,
    currency: 'NTD',
    advance_reservation_days: reservationDays || 0,
    tag1: (tag1 || null),
    tag2: (tag2 || null),
    tag3: (tag3 || null),
    send_option: sendOption,
    return_option: returnOption,
    ship_before_start_days: minimumShippemntDay,
    // assign_address_type: assignTypes.join(''),
    return_city: returnCity,
    return_area: returnArea,
    return_address: returnAddress,
    calculate_charge_type: chargeType,
    // start_date: (startDate ? startDate.valueOf() : null),
    // end_date: (endDate ? endDate.valueOf() : null),
    discounts,
    rules: [regulation],
    min_lease_days: 0,
    overdue_rate: hasOverduePolicy ? overdueRate : 0,
  });
};

export const savePublish = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const publish = getState()[REDUCER_KEY];
      const covers = getState()[COVER_REDUCER_KEY];
      asyncXhrAuthedPost(
        '/ajax/create_goods_item.json',
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
        '/ajax/update_goods_item.json',
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
  // assignAddressByCustomer: false,
  // assignAddressByOwner: false,
  returnCity: '',
  returnArea: '',
  returnAddress: '',
  /* PRICE */
  chargeType: 'fix',
  price: null,
  deposit: 0,
  discounts: [],
  unit: 0,
  reservationDays: 1,
  discount: '',
  regulation: '',
  hasOverduePolicy: false,
  overdueRate: 5,
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
