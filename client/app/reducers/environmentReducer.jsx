import * as TYPES from '../constants/actionTypes';

const initialState = {
  isMobile: false,
  height: null,
  width: null,
  containerWidth: 1070,
};
const environment = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CHANGE_RESOLUTION: {
      const { height, width } = action;
      return Object.assign({}, state, { height, width });
    }
    default:
      return state;
  }
};
export default environment;
