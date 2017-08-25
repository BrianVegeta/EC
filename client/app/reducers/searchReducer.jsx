import * as TYPES from '../constants/actionTypes';
import { SEARCH_SIZE } from '../actions/searchActions';

const initialState = {
  paginating: null, // users, items, wishs
  shouldLoading: true,
  query: '',
  users: [],
  isUserFetching: false,
  items: [],
  isItemFetching: false,
  wishs: [],
  isWishFetching: false,
  isMultiFetching: false,
  isPanelOpen: false,
  inputRect: {
    top: null, left: null, right: null, bottom: null, height: null, width: null,
  },
  // add by Kuan 20170823
  expireFlag: null,
  recursiveTimes: 0,
  isPaginable: true,
  index: 0,
  size: SEARCH_SIZE,
};
export default (state = initialState, action) => {
  const singleUpdate = name => Object.assign({}, state, { [name]: action[name] });
  const updateAfterInnerFetch = (name, isMore) => {
    let stateToUpdate = {};
    if (isMore) {
      stateToUpdate = {
        [name]: state[name].concat(action[name]),
        paginating: name,
        isPaginable: ((action[name].length > 0) &&
          (action[name].length % SEARCH_SIZE) === 0),
        index: state.index + action[name].length,
        isMultiFetching: false,
        shouldLoading: false,
      };
    } else {
      stateToUpdate = Object.assign(
        {},
        { users: [], items: [], wishs: [] },
        {
          [name]: action[name],
          paginating: name,
          isPaginable: (action[name].length === SEARCH_SIZE),
          index: action[name].length,
          isMultiFetching: false,
          shouldLoading: false,
        },
      );
    }
    return Object.assign({}, state, stateToUpdate);
  };
  switch (action.type) {
    case TYPES.SEARCH_UPDATE_QUERY:
      return singleUpdate('query');

    case TYPES.SEARCH_UPDATE_USERS:
      return singleUpdate('users');

    case TYPES.SEARCH_UPDATE_ITEMS:
      return singleUpdate('items');

    case TYPES.SEARCH_UPDATE_WISHS:
      return singleUpdate('wishs');

    case TYPES.SEARCH_BEFORE_FETCH_ITEM:
      return Object.assign({}, state, {
        isItemFetching: true,
        items: action.isMore ? state.items : [],
        users: [],
        wishs: [],
        shouldLoading: true,
        expireFlag: action.expireFlag,
      });

    case TYPES.SEARCH_BEFORE_FETCH_USER:
      return Object.assign({}, state, {
        isUserFetching: true,
        items: [],
        users: action.isMore ? state.users : [],
        wishs: [],
        shouldLoading: true,
        expireFlag: action.expireFlag,
      });

    case TYPES.SEARCH_BEFORE_FETCH_WISH:
      return Object.assign({}, state, {
        isWishFetching: true,
        items: [],
        users: [],
        wishs: action.isMore ? state.wishs : [],
        shouldLoading: true,
        expireFlag: action.expireFlag,
      });

    case TYPES.SEARCH_BEFORE_FETCH_MULTI:
      return Object.assign({}, state, {
        expireFlag: action.expireFlag,
        isMultiFetching: true,
        isItemFetching: false,
        isUserFetching: false,
        isWishFetching: false,
        isPanelOpen: true
      });

    // after fetch
    case TYPES.SEARCH_AFTER_FETCH_ITEM:
      return updateAfterInnerFetch('items', action.isMore);

    case TYPES.SEARCH_AFTER_FETCH_USER:
      return updateAfterInnerFetch('users', action.isMore);

    case TYPES.SEARCH_AFTER_FETCH_WISH:
      return updateAfterInnerFetch('wishs', action.isMore);

    case TYPES.SEARCH_DONE_FETCH_ITEM:
      return Object.assign({}, state, {
        isItemFetching: false,
        recursiveTimes: 0
      });

    case TYPES.SEARCH_DONE_FETCH_USER:
      return Object.assign({}, state, {
        isUserFetching: false,
        recursiveTimes: 0,
      });

    case TYPES.SEARCH_DONE_FETCH_WISH:
      return Object.assign({}, state, {
        isWishFetching: false,
        recursiveTimes: 0,
      });

    case TYPES.SEARCH_COUNT_RECURSIVE_TIMES:
      return Object.assign({}, state, {
        recursiveTimes: state.recursiveTimes + 1,
      });

    case TYPES.SEARCH_AFTER_FETCH_MULTI: {
      const { users, items, wishs } = action;
      return Object.assign({}, state, {
        users,
        items,
        wishs,
        isMultiFetching: false,
        shouldLoading: false,
        paginating: null,
      });
    }

    case TYPES.SEARCH_SET_INPUT_RECT: {
      const { top, left, right, bottom, height, width } = action;
      const inputRect = { top, left, right, bottom, height, width };
      return Object.assign({}, state, { inputRect });
    }

    case TYPES.SEARCH_CLEAR_MULTI_RESULTS: {
      const { users, items, wishs } = initialState;
      return Object.assign({}, state, {
        users,
        items,
        wishs,
        shouldLoading: true,
        paginating: null,
        isPanelOpen: false,
      });
    }

    case TYPES.SEARCH_CLOSE_RESULT_PANEL:
      return Object.assign({}, state, { isPanelOpen: false });

    default:
      return state;
  }
};
