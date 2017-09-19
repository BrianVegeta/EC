import { fromJS } from 'immutable';
// =============================================
// = settings =
// =============================================
export const REDUCER_KEY = 'filter';
const prefix = action => (`FILTER.${action}`);

export const SORT_NEWEST = 'SORT_NEWEST'; // 最新上架
export const SORT_POPULAR = 'SORT_POPULAR'; // 人氣好物
export const SORT_LOW_PRICE = 'SORT_LOW_PRICE'; // 價格由低至高
export const SORT_HIGH_PRICE = 'SORT_HIGH_PRICE'; // 價格由高至低
export const SEND_OPTION_SELF_COORDINATE = '0';  // 自行協調
export const SEND_OPTION_MAIL = '1';  // 郵寄
export const SEND_OPTION_SEVEN = '2'; // 7-11


// =============================================
// = HELPERS =
// =============================================
export const mapSortType = {
  [SORT_NEWEST]: '最新上架',
  [SORT_POPULAR]: '人氣好物',
  [SORT_LOW_PRICE]: '價格由低至高',
  [SORT_HIGH_PRICE]: '價格由高至低',
};

export const mapSortParams = (sortType) => {
  switch (sortType) {
    case SORT_NEWEST:
      return { column: 'time', type: 'desc' };
    case SORT_POPULAR:
      return { column: 'view', type: 'desc' };
    case SORT_LOW_PRICE:
      return { column: 'price', type: 'asc' };
    case SORT_HIGH_PRICE:
      return { column: 'price', type: 'desc' };
    default:
      return {
        column: 'time',
        type: 'desc',
      };
  }
};

export const mapSendOption = {
  [SEND_OPTION_SELF_COORDINATE]: '自行協調',
  [SEND_OPTION_MAIL]: '郵寄',
  [SEND_OPTION_SEVEN]: '7-11 取貨',
};


// =============================================
// = ACTION TYPE =
// =============================================
const CHANGE_PRICE = prefix('CHANGE_PRICE');
const CHANGE_SORT = prefix('CHANGE_SORT');
const CHANGE_SEND_OPTION = prefix('CHANGE_SEND_OPTION');
const SET_LOCATIONS = prefix('SET_LOCATIONS');
const CHANGE_CATEGORY = prefix('CHANGE_CATEGORY');
const RESET = prefix('RESET');

// =============================================
// = ACTIONS =
// =============================================

export const changePrice = price => ({
  type: CHANGE_PRICE,
  price,
});

export const changeSort = sort => ({
  type: CHANGE_SORT,
  sort,
});

export const changeSendOption = sendOption => ({
  type: CHANGE_SEND_OPTION,
  sendOption,
});

export const setLocations = locations => ({
  type: SET_LOCATIONS,
  locations,
});

export const changeCategory = categoryId => ({
  type: CHANGE_CATEGORY,
  categoryId,
});

export const reset = () => ({
  type: RESET,
});


// =============================================
// = REDUCER =
// =============================================
const initialState = {
  price: {
    min: null,
    max: null,
  },
  sort: null,
  sendOption: null,
  locations: [],
  categoryId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case CHANGE_PRICE:
      return fromJS(state).updateIn(
        ['price'],
        price => price.merge(action.price),
      ).toJS();

    case CHANGE_SORT:
      return Object.assign({}, state, { sort: action.sort });

    case CHANGE_SEND_OPTION:
      return Object.assign({}, state, { sendOption: action.sendOption });

    case SET_LOCATIONS:
      return Object.assign({}, state, { locations: action.locations });

    case CHANGE_CATEGORY:
      return Object.assign({}, state, { categoryId: action.categoryId });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
