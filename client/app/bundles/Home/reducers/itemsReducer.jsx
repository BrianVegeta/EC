import * as TYPES from '../constants/actionTypes';

const initialState = {
  fetchingState: 'init',
  categories: [],
  records: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ITEMS_FETCHING:
      return Object.assign({}, state, { fetchingState: 'fetching', records: [] });
    case TYPES.ITEMS_FETCHED: {
      const { items } = action;
      return Object.assign({}, state, { fetchingState: 'fetched', records: items });
    }
    default:
      return state;
  }
};
