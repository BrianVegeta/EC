import * as TYPES from '../constants/actionTypes';

const initialState = {
  currentStep: {
    title: '',
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.RELEASE_SET_TITLE: {
      const { title } = action;
      const currentStep = Object.assign({}, state.currentStep, { title });
      return Object.assign({}, state, { currentStep });
    }
    default:
      return state;
  }
};
