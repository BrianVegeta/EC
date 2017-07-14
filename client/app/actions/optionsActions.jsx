/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import { asyncXhrPost, asyncXhrGet } from 'lib/xhr';
import * as types from 'constants/actionTypes/options';

const setBanks = banks => ({
  type: types.SET_BANKS,
  banks,
});

const changeBankBranchs = (id, branchs) => ({
  type: types.CHANGE_BANK_BRANCHS,
  branchs,
  id,
});

export function prepareBanks() {
  return (dispatch) => {
    asyncXhrGet('/ajax/banks.json')
    .then((data) => {
      dispatch(setBanks(data));
    })
    .catch(() => {});
  };
}

export function prepareBankBranchs(bankId) {
  return (dispatch, getState) => {
    const { options } = getState();
    const selectingBank = _.find(options.banks, { id: bankId });
    if (selectingBank.branchs) {
      return;
    }

    asyncXhrPost('/ajax/bank_branchs.json', { bank_id: bankId })
    .then((data) => {
      dispatch(
        changeBankBranchs(bankId, data),
      );
    })
    .catch(() => {});
  };
}
