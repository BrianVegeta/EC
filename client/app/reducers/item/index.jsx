import * as TYPES from 'constants/actionTypes/item';
import detailReducer from './detail';

const initialState = {
  detail: {},
  reservation: {
    sendOption: null,
    sendCityArea: null,
    sendAddress: null,
    returnOption: null,
  },
};
export default function (state = initialState, action) {
  const assign = stateToUpdate => Object.assign({}, state, stateToUpdate);
  switch (action.type) {
    case TYPES.SET_EDIT: return assign(detailReducer(state, action));
    default:
      return state;
  }
}
