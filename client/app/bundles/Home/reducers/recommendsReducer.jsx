import * as TYPES from '../constants/actionTypes';

const initialState = {
  goods: { isFetching: false, items: [] },
  service: { isFetching: false, items: [] },
  space: { isFetching: false, items: [] },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.RECOMMENDS_RECEIVED: {
      const { items, category } = action;
      return Object.assign({}, state, {
        [category]: {
          ...state[category],
          isFetching: false,
          items,
        },
      });
    }
    case TYPES.RECOMMENDS_FETCHING: {
      const { category } = action;
      return Object.assign({}, state, {
        [category]: {
          ...state[category],
          isFetching: false,
        },
      });
    }
    default:
      return state;
  }
};
