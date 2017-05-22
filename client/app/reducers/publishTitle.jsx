import {
  PUBLISH_TITLE_UPDATE,
} from '../constants/actionTypes';

const TITLE_LIMIT = 30;
export const initialState = {
  value: '',
  length: 0,
  isOverLimit: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case PUBLISH_TITLE_UPDATE: {
      const { title } = action;
      const length = title.length;
      return Object.assign({}, state, {
        value: title,
        length,
        isOverLimit: (length > TITLE_LIMIT),
      });
    }
    default:
      return state;
  }
};
