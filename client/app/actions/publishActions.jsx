/* eslint-disable import/prefer-default-export */
import {
  PUBLISH_TITLE_UPDATE,
  PUBLISH_DESC_UPDATE,
  PUBLISH_TAGS_UPDATE,
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
