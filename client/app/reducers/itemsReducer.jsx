import * as TYPES from 'constants/actionTypes/items';

const initialState = {
  pagingRecursiveFrequency: 0,

  categoryID: null,
  isFetching: true,
  isPaginable: false, /* 分頁結束 */
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
        isPaginable: action.items.length === state.size,
        records: state.records.concat(action.items),
        index: state.index + action.items.length,
        categoryID: action.categoryID,
      });
      
    case TYPES.RESET:
       return initialState;
       
    default:
      return state;
  }
};
