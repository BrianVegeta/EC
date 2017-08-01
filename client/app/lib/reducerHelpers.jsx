/* eslint-disable import/prefer-default-export */
import { isEmpty } from 'lodash';

export const isCategoriesReady = categories =>
  !isEmpty(categories.goods) &&
  !isEmpty(categories.service) &&
  !isEmpty(categories.space);
