import * as TYPES from '../constants/actionTypes';

const initialState = {
  category: { isFetching: false, items: [], bannerUrl: false },
  goods: { isFetching: false, items: [], bannerUrl: false },
  service: { isFetching: false, items: [], bannerUrl: false },
  space: { isFetching: false, items: [], bannerUrl: false },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.RECOMMENDS_RECEIVED: {
      const { items, category, bannerUrl } = action;
      return Object.assign({}, state, {
        [category]: {
          ...state[category],
          isFetching: false,
          bannerUrl,
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
