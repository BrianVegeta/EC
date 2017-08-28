/* eslint-disable import/prefer-default-export */
import { find } from 'lodash';
import { fromJS } from 'immutable';
import {
  asyncXhrGet,
  asyncXhrPost,
} from 'lib/xhr';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'BANKS';
export const REDUCER_KEY = 'banks';

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const SET_BANKS = prefix('SET_BANKS');
const UPDATE_BRANCHS = prefix('UPDATE_BRANCHS');

// =============================================
// = actions =
// =============================================

const setBanks = banks => ({
  type: SET_BANKS,
  banks,
});

const updateBranchs = (id, branchs) => ({
  type: UPDATE_BRANCHS,
  branchs,
  id,
});

export const fetchBanks = () =>
  (dispatch) => {
    asyncXhrGet('/ajax/banks.json')
    .then(banks => dispatch(setBanks(banks)))
    .catch(() => {});
  };

export const fetchBranchs = bankId =>
  (dispatch, getState) => {
    const banks = getState()[REDUCER_KEY];
    const targetBank = find(banks, { id: bankId });
    // had branchs, not to fetch
    if (targetBank.branchs) return;

    asyncXhrPost('/ajax/bank_branchs.json', { bank_id: bankId })
    .then(branchs => dispatch(updateBranchs(bankId, branchs)))
    .catch(() => {});
  };

// =============================================
// = reducer =
// =============================================
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_BANKS:
      return action.banks.map(({ id, bankname: bankName }) => ({
        id, bankName,
      }));

    case UPDATE_BRANCHS: {
      const banks = fromJS(state);
      const branchs = action.branchs.map(({
        bankid: bankId, branchid: id, branchname: branchName,
      }) => ({ id, bankId, branchName }));

      return banks.update(
        banks.findIndex(bank => bank.get('id') === action.id),
        bank => bank.set('branchs', branchs),
      ).toJS();
    }

    default:
      return state;
  }
};
