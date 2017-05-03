import * as TYPES from '../constants/actionTypes';

const initialState = {
  cities: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ADDRESS_SET_CITIES: {
      const { cities } = action;
      return Object.assign({}, state, { cities });
    }
    default:
      return state;
  }
};
