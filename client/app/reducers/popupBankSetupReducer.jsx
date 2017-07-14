import * as types from 'constants/actionTypes/popupBankSetup';

const initialState = {
  realName: '',
  identityNo: '',
  // phone, email
  accBankId: '',
  accBankBranchId: '',
  accName: '',
  accNo: '',

  pwdCheck: '',
};

export default (state = initialState, action) => {
  switch (action.type) {

    case types.CHANGE_DATA:
      return Object.assign({}, state, action.data);

    case types.RESET:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
};
