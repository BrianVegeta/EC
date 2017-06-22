import * as TYPES from '../constants/actionTypes';

const initialState = {
  paginating: null, // users, items, wishs
  shouldLoading: true,
  query: '',
  users: null,
  isUserFetching: false,
  items: null,
  isItemFetching: false,
  wishs: null,
  isWishFetching: false,
  isMultiFetching: false,
  isPanelOpen: false,
  inputRect: {
    top: null, left: null, right: null, bottom: null, height: null, width: null,
  },
};
export default (state = initialState, action) => {
  const singleUpdate = name => Object.assign({}, state, { [name]: action[name] });
  const updateAfterInnerFetch = (name) => {
    const stateToUpdate = Object.assign(
      {},
      { users: null, items: null, wishs: null },
      { [name]: action[name], paginating: name, isMultiFetching: false },
    );
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
      return Object.assign({}, state, { isItemFetching: true });

    case TYPES.SEARCH_BEFORE_FETCH_USER:
      return Object.assign({}, state, { isUserFetching: true });

    case TYPES.SEARCH_BEFORE_FETCH_WISH:
      return Object.assign({}, state, { isWishFetching: true });

    case TYPES.SEARCH_BEFORE_FETCH_MULTI:
      return Object.assign({}, state, { isMultiFetching: true, isPanelOpen: true });

    // after fetch
    case TYPES.SEARCH_AFTER_FETCH_ITEM:
      return updateAfterInnerFetch('items');

    case TYPES.SEARCH_AFTER_FETCH_USER:
      return updateAfterInnerFetch('users');

    case TYPES.SEARCH_AFTER_FETCH_WISH:
      return updateAfterInnerFetch('wishs');

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
