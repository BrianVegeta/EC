/* eslint-disable import/prefer-default-export */

import { HELLO_WORLD_NAME_UPDATE } from '../constants/actionTypes';

export const updateName = text => ({
  type: HELLO_WORLD_NAME_UPDATE,
  text,
});
