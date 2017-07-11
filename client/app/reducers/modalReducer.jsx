import * as types from '../constants/actionTypes/modal';

const initialState = {
  component: null,
  data: {},
  open: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case types.OPEN:
      return Object.assign({}, state, {
        component: action.component,
        data: action.data,
        open: true,
      });

    default:
      return state;
  }
};
