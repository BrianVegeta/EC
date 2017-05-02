import * as TYPES from '../constants/actionTypes';

const titleLimit = 30;
const descriptLimit = 250;
const initialState = {
  form: {
    title: '',
    titleLength: 0,
    isTitleOverLength: false,
    descript: '',
    descriptLength: 0,
    isDescriptOverLength: false,
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ITEM_RELEASE_SET_TITLE: {
      const { title } = action;
      const titleLength = title.length;
      const isTitleOverLength = titleLength > titleLimit;
      const form = Object.assign({}, state.form, { title, titleLength, isTitleOverLength });
      return Object.assign({}, state, { form });
    }
    case TYPES.ITEM_RELEASE_SET_DESCRIPTION: {
      const { descript } = action;
      const descriptLength = descript.replace(/\n/g, '').length;
      const isDescriptOverLength = descriptLength > descriptLimit;
      const form = Object.assign({}, state.form, {
        descript,
        descriptLength,
        isDescriptOverLength,
      });
      return Object.assign({}, state, { form });
    }
    default:
      return state;
  }
};
