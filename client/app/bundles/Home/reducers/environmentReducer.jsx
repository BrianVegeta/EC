import * as TYPES from '../constants/actionTypes';

const initialState = {
  isMobile: false,
  height: null,
  width: null,
  containerWidth: 1070,
  scrollTop: 0,
  itemsLayoutFixed: false,
};
const environment = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CHANGE_RESOLUTION: {
      const { height, width } = action;
      return Object.assign({}, state, { height, width });
    }
    // case TYPES.ENVIRONMENT_CHANGE_SCROLLTOP: {
    //   const { scrollTop } = action;
    //   return Object.assign({}, state, { scrollTop });
    // }
    case TYPES.ENVIRONMENT_CHECK_ITEMS_LAYOUT_FIXED: {
      const { fixed } = action;
      return Object.assign({}, state, { itemsLayoutFixed: fixed });
    }
    default:
      return state;
  }
};
export default environment;
