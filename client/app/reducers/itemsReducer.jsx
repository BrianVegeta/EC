import * as TYPES from 'constants/actionTypes/items';

const initialState = {
  categoryID: null,
  isFetching: true,
  records: [],
};

export default (state = initialState, action) => {
  switch (action.type) {

    case TYPES.FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case TYPES.FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        records: action.items,
        categoryID: action.categoryID,
      });

    default:
      return state;
  }
};
