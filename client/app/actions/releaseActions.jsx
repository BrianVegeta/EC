/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes';

export const setTitle = title => ({
  type: TYPES.RELEASE_SET_TITLE,
  title,
});

export const setCategorySelectionParent = parentId => ({
  type: TYPES.RELEASE_SET_CATEGORY_SELECTION_PARENT,
  parentId,
});

export const purgeCategorySelectionParent = () => ({
  type: TYPES.RELEASE_REMOVE_CATEGORY_SELECTION_PARENT,
});
