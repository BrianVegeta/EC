import * as TYPES from 'constants/actionTypes/item';

const BELONGS_TO = 'detail';

const combine = self => ({ [BELONGS_TO]: self });
const slice = state => state[BELONGS_TO];

export default (originState, action) => {
  const state = slice(originState);
  const assign = stateToUpdate => Object.assign({}, state, stateToUpdate);

  switch (action.type) {
    case TYPES.SET_EDIT:
      return combine(assign(action.detail));
    default:
      return state;
  }
};
