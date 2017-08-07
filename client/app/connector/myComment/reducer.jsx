import * as types from './actionTypes';
import { TYPE_OWNER } from './actions';

const initialState = {
  fetchType: TYPE_OWNER,
  isFetching: false,
  isPaginable: false, /* 分頁結束 */
  records: [],
  index: 0,
  size: 11,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
        fetchType: action.fetchType,
      });

    case types.FETCHED:
      if (state.isFetching) {
        return Object.assign({}, state, {
          isFetching: false,
          records: action.comments,
        });
      }

      return Object.assign({}, state, {
        records: [],
      });

    case types.RESET:
      return Object.assign({}, state, {
        isFetching: false,
        records: [],
        index: 0,
        size: 11,
      });

    default:
      return state;
  }
};
