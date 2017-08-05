import _ from 'lodash';
import * as types from './actionTypes';

const initialState = {
  isFetching: false,
  records: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING:
      return Object.assign({}, state, { isFetching: true });

    case types.FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        records: action.records
      });

    default:
      return state;
  }
};
