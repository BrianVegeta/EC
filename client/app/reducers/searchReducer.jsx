import * as TYPES from '../constants/actionTypes';

const initialState = {
  query: '',
  users: null,
  isUserFetching: false,
  items: null,
  isItemFetching: false,
  wishs: null,
  isWishFetching: false,
};
export default (state = initialState, action) => {
  const singleUpdate = name => Object.assign({}, state, { [name]: action[name] });
  const updateWithFetching = (name, fetchingName, status) => (
    Object.assign({}, state, { [name]: action[name], [fetchingName]: status })
  );

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
      return Object.assign({}, state, {
        isItemFetching: false,
        isUserFetching: false,
        isWishFetching: false,
      });

    case TYPES.SEARCH_AFTER_FETCH_ITEM:
      return updateWithFetching('items', 'isItemFetching', true);

    case TYPES.SEARCH_AFTER_FETCH_USER:
      return updateWithFetching('users', 'isUserFetching', true);

    case TYPES.SEARCH_AFTER_FETCH_WISH:
      return updateWithFetching('wishs', 'isWishFetching', true);

    case TYPES.SEARCH_AFTER_FETCH_MULTI: {
      const { users, items, wishs } = action;
      return Object.assign({}, state, {
        isItemFetching: false,
        isUserFetching: false,
        isWishFetching: false,
        users,
        items,
        wishs,
      });
    }

    default:
      return state;
  }
};
