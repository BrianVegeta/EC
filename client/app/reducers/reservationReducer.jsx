import * as types from 'constants/actionTypes/reservation';

const initialState = {
  // FORM DATA BELOW
  sendOption: '',
  sendCity: '',
  sendArea: '',
  sendAddress: '',
  returnOption: '',
  startDate: null,
  endDate: null,
  amount: 1,
  couponNo: null,
  couponOffset: 0,
  contactName: '',
  contactPhone: '',
  note: '',
  paymenttype: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_SEND_OPTION:
      return Object.assign({}, state, {
        sendOption: action.value,
      });

    case types.CHANGE_SEND_CITYAREA:
      return Object.assign({}, state, {
        sendCity: action.city,
        sendArea: action.area,
      });

    case types.CHANGE_SEND_ADDRESS:
      return Object.assign({}, state, {
        sendAddress: action.address,
      });

    case types.CHANGE_RETURN_OPTION:
      return Object.assign({}, state, {
        returnOption: action.value,
      });

    case types.CHANGE_DATES:
      return Object.assign({}, state, {
        startDate: action.startDate,
        endDate: action.endDate,
      });

    case types.CHANGE_AMOUNT:
      return Object.assign({}, state, {
        amount: action.amount,
      });

    case types.CHANGE_COUPON:
      return Object.assign({}, state, {
        couponNo: action.couponNo,
        couponOffset: action.couponOffset,
      });

    case types.CHANGE_FORM_DATA:
      return Object.assign({}, state, action.formData);

    default:
      return state;
  }
};
