import _ from 'lodash';
import {
  PUBLISH_THUMBS_CREATE,
  PUBLISH_THUMBS_UPDATE_ORDERS,
  PUBLISH_THUMBS_REMOVE_ONE,
  PUBLISH_THUMBS_UPDATING_ONE,
  PUBLISH_THUMBS_UPDATED_ONE,
} from '../constants/actionTypes';

const initialThumb = {
  key: '?',
  blobUrl: null,
  isUploading: false,
};
const initialState = [];
export default (state = initialState, action) => {
  switch (action.type) {
    case PUBLISH_THUMBS_CREATE: {
      const thumbs = state.concat();
      thumbs.push(
        Object.assign({}, initialThumb, {
          key: `KEY_${Date.now().toString()}`,
          blobUrl: action.blobUrl,
        }),
      );
      return thumbs;
    }
    case PUBLISH_THUMBS_UPDATE_ORDERS:
      return action.thumbs;

    case PUBLISH_THUMBS_REMOVE_ONE: {
      const { key } = action;
      const thumbs = state.concat();
      thumbs.splice(_.findIndex(thumbs, { key }), 1);
      return thumbs;
    }
    case PUBLISH_THUMBS_UPDATING_ONE: {
      const { key, blobUrl } = action;
      const thumbs = state.concat();
      const index = _.findIndex(thumbs, { key });
      thumbs[index] = Object.assign({}, thumbs[index], {
        isUploading: true,
        blobUrl,
      });
      return thumbs;
    }
    case PUBLISH_THUMBS_UPDATED_ONE: {
      const { key, blobUrl } = action;
      const thumbs = state.concat();
      const index = _.findIndex(thumbs, { key });
      thumbs[index] = Object.assign({}, thumbs[index], {
        isUploading: false,
        blobUrl,
      });
      return thumbs;
    }
    default:
      return state;
  }
};
