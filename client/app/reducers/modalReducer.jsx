import * as types from '../constants/actionTypes/modal';

const initialState = {
  Component: null,
  data: {},
  isOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case types.OPEN:
      return Object.assign({}, state, {
        Component: action.component,
        data: action.data,
        isOpen: true,
      });

    default:
      return state;
  }
};
