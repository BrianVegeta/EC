import _ from 'lodash';
import * as types from './actionTypes';

const initialState = {
  isFetching: false,
  collections: [],
};

export default (state = initialState, action) => {

  switch (action.type) {
    case types.FETCHING: 
      return Object.assign({}, state, { isFetching: true });
      
    case types.FETCHED: 
        return Object.assign({}, state, { 
            isFetching: false, 
            collections: action.collections 
            });

    default:
      return state;
  }
};
