import * as TYPES from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  items: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.BANNERS_FETCHING:
      return Object.assign({}, state, { isFetching: true });
    case TYPES.BANNERS_RECEIVED: {
      const { banners } = action;
      return Object.assign({}, state, { items: banners, isFetching: false });
    }
    default:
      return state;
  }
};
