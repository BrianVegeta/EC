import * as TYPES from '../constants/actionTypes';

const initialState = {
  covers: [],
  current: null,
};
const environment = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.EDITOR_COVERS_OPEN_EDIT_MODAL:
      return Object.assign({}, state, { current: action.image });
    default:
      return state;
  }
};
export default environment;
