import * as TYPES from '../constants/actionTypes';

const initialState = {
  covers: [],
  current: {
    blob: null,
  },
};
const environment = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.EDITOR_COVERS_OPEN_EDIT_MODAL:
      return Object.assign({}, state, {
        current: Object.assign({}, state.current, {
          blob: action.image,
        }),
      });
    default:
      return state;
  }
};
export default environment;
