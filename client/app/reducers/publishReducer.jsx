import coverCropper, { initialState as initialCoverCropper } from './publishCropper';
import coverThumbs from './publishThumbs';
import titleHandler, { initialState as initialTitle } from './publishTitle';
import descHandler, { initialState as initialDescript } from './publishDescript';
import { insertOption, removeOption } from './publishOptions';
import {
  PUBLISH_OEPN_CROPPER,
  PUBLISH_CLOSE_CROPPER,

  PUBLISH_THUMBS_CREATE,
  PUBLISH_THUMBS_UPDATE_ORDERS,
  PUBLISH_THUMBS_REMOVE_ONE,
  PUBLISH_THUMBS_UPDATING_ONE,
  PUBLISH_THUMBS_UPDATED_ONE,

  PUBLISH_TITLE_UPDATE,
  PUBLISH_DESC_UPDATE,
  PUBLISH_TAGS_UPDATE,

  PUBLISH_SEND_OPTIONS_UPDATE,
  PUBLISH_RETURN_OPTIONS_UPDATE,
} from '../constants/actionTypes';

const initialState = {
  coverThumbs: [],
  coverCropper: initialCoverCropper,
  title: initialTitle,
  descript: initialDescript,
  hashtags: [null, null, null],
  sendOptions: '012',
  returnOptions: '012',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case PUBLISH_OEPN_CROPPER:
      return Object.assign({}, state, {
        coverCropper: coverCropper(state.coverCropper, action),
      });

    case PUBLISH_CLOSE_CROPPER:
      return Object.assign({}, state, {
        coverCropper: coverCropper(state.coverCropper, action),
      });

    case PUBLISH_THUMBS_CREATE:
      return Object.assign({}, state, {
        coverThumbs: coverThumbs(state.coverThumbs, action),
      });

    case PUBLISH_THUMBS_UPDATE_ORDERS:
      return Object.assign({}, state, {
        coverThumbs: coverThumbs(state.coverThumbs, action),
      });

    case PUBLISH_THUMBS_REMOVE_ONE:
      return Object.assign({}, state, {
        coverThumbs: coverThumbs(state.coverThumbs, action),
      });

    case PUBLISH_THUMBS_UPDATING_ONE:
      return Object.assign({}, state, {
        coverThumbs: coverThumbs(state.coverThumbs, action),
      });

    case PUBLISH_THUMBS_UPDATED_ONE:
      return Object.assign({}, state, {
        coverThumbs: coverThumbs(state.coverThumbs, action),
      });

    case PUBLISH_TITLE_UPDATE:
      return Object.assign({}, state, {
        title: titleHandler(state.title, action),
      });

    case PUBLISH_DESC_UPDATE:
      return Object.assign({}, state, {
        descript: descHandler(state.descript, action),
      });

    case PUBLISH_TAGS_UPDATE:
      return Object.assign({}, state, {
        hashtags: action.hashtags,
      });

    case PUBLISH_SEND_OPTIONS_UPDATE: {
      const { optionKey, isChecked } = action;
      const handleOptions = isChecked ? insertOption : removeOption;
      return Object.assign({}, state, {
        sendOptions: handleOptions(state.sendOptions, optionKey),
      });
    }
    case PUBLISH_RETURN_OPTIONS_UPDATE: {
      const { optionKey, isChecked } = action;
      const handleOptions = isChecked ? insertOption : removeOption;
      return Object.assign({}, state, {
        returnOptions: handleOptions(state.returnOptions, optionKey),
      });
    }
    default:
      return state;
  }
};
