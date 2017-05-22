import {
  PUBLISH_DESC_UPDATE,
} from '../constants/actionTypes';

const DESC_LIMIT = 250;
export const initialState = {
  value: '',
  length: 0,
  isOverLimit: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case PUBLISH_DESC_UPDATE: {
      const { descript } = action;
      const length = descript.replace(/\n/g, '').length;
      return Object.assign({}, state, {
        value: descript,
        length,
        isOverLimit: (length > DESC_LIMIT),
      });
    }


    default:
      return state;
  }
};
