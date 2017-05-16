import * as TYPES from '../constants/actionTypes';

const initialState = {
  covers: [],
  current: {
    blob: null,
    data: null,
    croppedCanvs: null,
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
    case TYPES.EDITOR_COVERS_CANCEL_EDIT:
      return Object.assign({}, state, {
        current: initialState.current,
      });
    case TYPES.EDITOR_COVERS_GET_CROPPED_CANVAS:
      return Object.assign({}, state, {
        current: Object.assign({}, state.current, {
          croppedCanvs: action.data,
        }),
      });
    default:
      return state;
  }
};
export default environment;
