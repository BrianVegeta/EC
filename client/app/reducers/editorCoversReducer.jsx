import _ from 'lodash';
import * as TYPES from '../constants/actionTypes';

const initialCover = { key: '?', blob: null };
const initialState = {
  covers: [],
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
    case TYPES.EDITOR_COVERS_NEW_COVER_WITH_BLOB: {
      const covers = state.covers.concat();
      covers.push(
        Object.assign({}, initialCover, {
          key: Date.now(),
          blob: action.blob,
        }),
      );
      return Object.assign({}, state, { covers });
    }
    case TYPES.EDITOR_COVERS_UPDATE_COVERS:
      return Object.assign({}, state, {
        covers: action.covers,
      });
    case TYPES.EDITOR_COVERS_REMOVE_COVER:
      return Object.assign({}, state, {
        covers: state.covers.concat().splice(
          _.findIndex(state.covers, { key: action.key }), 1,
        ),
      });
    default:
      return state;
  }
};
export default environment;
