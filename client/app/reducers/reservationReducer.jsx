import * as TYPES from 'constants/actionTypes/reservation';

const initialState = {
  sendOption: '',
  sendCity: '',
  sendArea: '',
  sendAddress: '',
  returnOption: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CHANGE_SEND_OPTON:
      return Object.assign({
        sendOption: action.option,
      });

    case TYPES.CHANGE_SEND_CITYAREA:
      return Object.assign({
        sendCity: action.city,
        sendArea: action.area,
      });

    case TYPES.CHANGE_SEND_ADDRESS:
      return Object.assign({
        sendAddress: action.address,
      });

    case TYPES.CHANGE_RETURN_OPTION:
      return Object.assign({
        returnOption: action.option,
      });

    default:
      return state;
  }
};
