/* eslint-disable import/prefer-default-export */
import {
  PUBLISH_TITLE_UPDATE,
  PUBLISH_DESC_UPDATE,
  PUBLISH_TAGS_UPDATE,

  PUBLISH_SEND_OPTIONS_UPDATE,
  PUBLISH_RETURN_OPTIONS_UPDATE,
} from '../constants/actionTypes';

export const updateTitle = title => ({
  type: PUBLISH_TITLE_UPDATE,
  title,
});
export const updateDesc = descript => ({
  type: PUBLISH_DESC_UPDATE,
  descript,
});
export const updateTags = hashtags => ({
  type: PUBLISH_TAGS_UPDATE,
  hashtags,
});

export const OPTION_IN_PERSON = 0;
export const OPTION_MAIL = 1;
export const OPTION_SEVEN = 2;
export const updateSendOptions = (optionKey, isChecked) => ({
  type: PUBLISH_SEND_OPTIONS_UPDATE,
  optionKey,
  isChecked,
});
export const updateReturnOptions = (optionKey, isChecked) => ({
  type: PUBLISH_RETURN_OPTIONS_UPDATE,
  optionKey,
  isChecked,
});
