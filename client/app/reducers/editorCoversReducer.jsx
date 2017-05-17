import _ from 'lodash';
import * as TYPES from '../constants/actionTypes';

const initialCover = {
  key: '?',
  blob: null,
  isUploading: false,
};
const initialState = {
  covers: [],
  current: {
    blob: null,
    key: null,
  },
};
const environment = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.EDITOR_COVERS_OPEN_EDIT_MODAL: {
      const { key, cover } = action;
      return Object.assign({}, state, {
        current: Object.assign({}, state.current, {
          key,
          blob: cover,
        }),
      });
    }
    case TYPES.EDITOR_COVERS_CANCEL_EDIT:
      return Object.assign({}, state, {
        current: initialState.current,
      });
    // covers below
    case TYPES.EDITOR_COVERS_NEW_COVER_WITH_BLOB: {
      const covers = state.covers.concat();
      covers.push(
        Object.assign({}, initialCover, {
          key: Date.now().toString(),
          blob: action.blob,
        }),
      );
      return Object.assign({}, state, { covers });
    }
    case TYPES.EDITOR_COVERS_UPDATE_COVERS: {
      const { covers } = action;
      return Object.assign({}, state, { covers });
    }
    case TYPES.EDITOR_COVERS_REMOVE_COVER: {
      const { key } = action;
      const covers = state.covers.concat();
      covers.splice(_.findIndex(covers, { key }), 1);
      return Object.assign({}, state, { covers });
    }
    case TYPES.EDITOR_COVERS_UPDATING_COVER: {
      const { key, blob } = action;
      const covers = state.covers.concat();
      const index = _.findIndex(covers, { key });
      covers[index] = Object.assign({}, covers[index], {
        isUploading: true,
        blob,
      });
      return Object.assign({}, state, { covers });
    }
    case TYPES.EDITOR_COVERS_UPDATED_COVER: {
      const { key, blob } = action;
      const covers = state.covers.concat();
      const index = _.findIndex(covers, { key });
      covers[index] = Object.assign({}, covers[index], {
        isUploading: false,
        blob,
      });
      return Object.assign({}, state, { covers });
    }
    default:
      return state;
  }
};
export default environment;
