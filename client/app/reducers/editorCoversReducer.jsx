import _ from 'lodash';
import * as TYPES from '../constants/actionTypes';

const initialCover = { key: '?', blob: null };
const initialState = {
  covers: ['1st', '2nd', '3rd'].map(key =>
    Object.assign({}, initialCover, { key }),
  ),
  current: {
    blob: null,
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
    case TYPES.EDITOR_COVERS_NEW_COVER_WITH_BLOB:
      return state;
    case TYPES.EDITOR_COVERS_UPDATE_COVERS:
      return state;
    case TYPES.EDITOR_COVERS_REMOVE_COVER: {
      const covers = state.covers.concat();
      const { key } = action;
      const index = _.findIndex(covers, { key });
      if (index < 0) return state;
      covers.splice(index, 1).push(
        Object.assign({}, initialCover, { key }),
      );
      return Object.assign({}, state, { covers });
    }
    default:
      return state;
  }
};
export default environment;
