import * as TYPES from '../constants/actionTypes';

const initialState = {
  currentStep: {
    title: '',
  },
  categorySelection: {
    parentId: null,
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.RELEASE_SET_TITLE: {
      const { title } = action;
      const currentStep = Object.assign({}, state.currentStep, { title });
      return Object.assign({}, state, { currentStep });
    }
    case TYPES.RELEASE_SET_CATEGORY_SELECTION_PARENT: {
      const { parentId } = action;
      const categorySelection = { parentId };
      return Object.assign({}, state, { categorySelection });
    }
    case TYPES.RELEASE_REMOVE_CATEGORY_SELECTION_PARENT: {
      const categorySelection = Object.assign({}, initialState.categorySelection);
      return Object.assign({}, state, { categorySelection });
    }
    default:
      return state;
  }
};
