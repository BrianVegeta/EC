import * as MINE from '../constants/actionTypes/mine';

const initialState = {
  items: [],
  itemsCateState: 'goods', // goods, service, space
};
export default (state = initialState, action) => {
  switch (action.type) {
    case MINE.ITEMS_FETCHED: {
      const { items } = action;
      return Object.assign({}, state, { items: items || initialState.items });
    }
    case MINE.ITEMS_TAB: {
      const { itemsCateState } = action;
      return Object.assign({}, state, { itemsCateState });
    }
    default:
      return state;
  }
};
