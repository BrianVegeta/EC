/* eslint-disable import/prefer-default-export */

import { getBankacc, unzipBankInfo } from 'actions/module/bankaccActions';
import * as types from 'constants/actionTypes/popupBankSetup';

export const changeData = data => ({
  type: types.CHANGE_DATA,
  data,
});

export function setBankInfo() {
  return (dispatch) => {
    dispatch(
      getBankacc({
        success: (data) => {
          dispatch(
            changeData({
              realName: unzipBankInfo(data).bankName,
              identityNo: unzipBankInfo(data).idNumber,
              phone: unzipBankInfo(data).phone,
              email: unzipBankInfo(data).email,
              accBankId: unzipBankInfo(data).bankNumber.slice(0, 3),
              accBankBranchId: unzipBankInfo(data).bankNumber.slice(3, 7),
              accName: unzipBankInfo(data).accName,
              accNo: unzipBankInfo(data).accNumber,
            }),
          );
        },
        error: () => {},
      }),
    );
  };
}
