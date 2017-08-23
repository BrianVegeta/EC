import { asyncXhrAuthedPost } from 'lib/xhr';
// import moment from 'moment';
import { REDUCER_KEY as COVER_REDUCER_KEY } from './covers';

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

export const reset = () => ({
  type: RESET,
});

const transformParams = (covers, {
  title, descript, categoryID,
  cityName, areaName,
  tag1, tag2, tag3,
  unit, price, deposit, reservationDays,
  assignAddressByOwner, assignAddressByCustomer,
  assignCity, assignArea, assignAddress,
  chargeType, startDate, endDate, discount,
  regulation,
}) => {
  const assignTypes = [];
  if (assignAddressByOwner) assignTypes.push(ASSIGN_ADDRESS_BY_OWNER);
  if (assignAddressByCustomer) assignTypes.push(ASSIGN_ADDRESS_BY_CUSTOMER);
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
    advance_reservation_days: reservationDays,
    tag1: (tag1 || null),
    tag2: (tag2 || null),
    tag3: (tag3 || null),
    assign_address_type: assignTypes.join(''),
    assign_city: assignCity,
    assign_area: assignArea,
    assign_address: assignAddress,
    calculate_charge_type: chargeType,
    start_date: (startDate ? startDate.valueOf() : null),
    end_date: (endDate ? endDate.valueOf() : null),
    discounts: (chargeType === CHARGE_TYPE_FIX) && discount ?
      [{ type: 'FIX', param: 0, discount }] : [],
    rules: [regulation],
    min_lease_days: 0,
  });
};
export const savePublish = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const publish = getState()[REDUCER_KEY];
      const covers = getState()[COVER_REDUCER_KEY];
      asyncXhrAuthedPost(
        '/ajax/create_service_item.json',
        transformParams(covers, publish),
        getState(),
      )
      .then((data) => {
        console.warn(data);
        resolve(data);
      })
      .catch(() => reject());
    });

// =============================================
// = reducer =
// =============================================
const initialState = {
  touchedStepPaths: [],
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
  assignAddressByOwner: false,
  assignCity: '',
  assignArea: '',
  assignAddress: '',
  /* PRICE */
  chargeType: '',
  price: null,
  deposit: null,
  startDate: null,
  endDate: null,
  unit: 0,
  reservationDays: 1,
  discount: '',
  regulation: '',
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

    case RESET:
      return initialState;

    default:
      return state;
  }
};
