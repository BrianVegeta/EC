import { fromJS } from 'immutable';
import * as types from 'constants/actionTypes/options';

// {
//   bankname: 'xxx',
//   id: '009',
//   [branchs]: Array[
//     Object{
//       bankid: "004",
//       branchid: "0037",
//       branchname: "營業部",
//     },
//   ],
// }

const initialState = {
  banks: [],
  categories: {
    goods: [],
    service: [],
    space: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    /* 分類 */
    case types.SET_CATEGORIES:
      return fromJS(state).mergeIn(
        ['categories'],
        action.categories,
      ).toJS();

    /* 銀行 */
    case types.SET_BANKS:
      return Object.assign({}, state, {
        banks: action.banks,
      });

    /* 分行 */
    case types.CHANGE_BANK_BRANCHS:
      return fromJS(state).updateIn(
        ['banks'],
        list => list.update(
          list.findIndex(bank => (bank.get('id') === action.id)),
          bank => bank.set('branchs', action.branchs),
        ),
      ).toJS();

    default:
      return state;
  }
};
