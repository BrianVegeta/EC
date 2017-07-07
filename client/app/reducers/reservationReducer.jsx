import * as TYPES from 'constants/actionTypes/reservation';

const initialState = {
  sendOption: '',
  sendCity: '',
  sendArea: '',
  sendAddress: '',
  returnOption: '',

  startDate: null,
  endDate: null,
  amount: 1,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CHANGE_SEND_OPTION:
      return Object.assign({}, state, {
        sendOption: action.value,
      });

    case TYPES.CHANGE_SEND_CITYAREA:
      return Object.assign({}, state, {
        sendCity: action.city,
        sendArea: action.area,
      });

    case TYPES.CHANGE_SEND_ADDRESS:
      return Object.assign({}, state, {
        sendAddress: action.address,
      });

    case TYPES.CHANGE_RETURN_OPTION:
      return Object.assign({}, state, {
        returnOption: action.value,
      });

    case TYPES.CHANGE_DATES:
      return Object.assign({}, state, {
        startDate: action.startDate,
        endDate: action.endDate,
      });

    case TYPES.CHANGE_AMOUNT:
      return Object.assign({}, state, {
        amount: action.amount,
      });

    default:
      return state;
  }
};
