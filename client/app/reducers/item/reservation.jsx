import * as TYPES from 'constants/actionTypes/item';

const BELONGS_TO = 'reservation';

const reducer = (state, action) => {
  const assign = stateToUpdate => Object.assign({}, state, stateToUpdate);
  switch (action.type) {
    case TYPES.RESERVATION.SELECT_SEND_OPTION:
      return Object.assign({}, state, { sendOption: action.sendOption });
    default:
      return state;
  }
};

const slice = state => state[BELONGS_TO];
const combine = self => ({ [BELONGS_TO]: self });
export default (originState, originalAction) => {
  const state = slice(originState);
  const action = slice(originalAction);
  return combine(reducer(state, action));
};
