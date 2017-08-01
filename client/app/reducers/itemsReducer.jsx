import * as TYPES from 'constants/actionTypes/items';

const initialState = {
  categoryID: null,
  isFetching: true,
  records: [],
  index: 0,
  size: 21,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case TYPES.FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
        categoryID: action.categoryID,
      });

    case TYPES.FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        records: state.records.concat(action.items),
        index: state.index + action.items.length,
        categoryID: action.categoryID,
      });

    default:
      return state;
  }
};
