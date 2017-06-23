import _ from 'lodash';
import * as MINE from '../constants/actionTypes/mine';

const initialState = {
  items: [],
  itemsCateState: 'goods', // goods, service, space
  itemsEditing: false,
  itemsToRemove: [],
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
    case MINE.ITEMS_EDITING: {
      return Object.assign({}, state, { itemsEditing: true });
    }
    case MINE.ITEMS_CANCEL_EDITING: {
      const { itemsToRemove } = initialState;
      return Object.assign({}, state, { itemsEditing: false, itemsToRemove });
    }
    case MINE.ITEMS_ADD_TO_DELETE: {
      const itemsToRemove = state.itemsToRemove.concat();
      itemsToRemove.push(action.pid);
      return Object.assign({}, state, { itemsToRemove });
    }
    case MINE.ITEMS_DELETE: {
      const { pids } = action;
      const items = state.items.concat();
      const itemsFiltered = _.filter(items, item => !pids.includes(item.pid));
      return Object.assign({}, state, { items: itemsFiltered });
    }
    default:
      return state;
  }
};
