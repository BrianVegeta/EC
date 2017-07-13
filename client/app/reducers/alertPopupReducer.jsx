import * as types from 'constants/actionTypes/alertPopup';

const initialState = {
  isOpen: false,
  renderType: null,
  options: {},
};

export default (state = initialState, action) => {
  switch (action.type) {

    case types.OPEN:
      return Object.assign({}, state, {
        isOpen: true,
        renderType: action.renderType,
        options: action.options,
        width: action.width,
      });

    case types.CLOSE:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
};
