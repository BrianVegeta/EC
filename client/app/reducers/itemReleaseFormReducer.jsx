import * as TYPES from '../constants/actionTypes';

const titleLimit = 30;
const descriptLimit = 250;
const initialState = {
  title: '',
  titleLength: 0,
  isTitleOverLength: false,
  descript: '',
  descriptLength: 0,
  isDescriptOverLength: false,
  city: '',
  shipping: '',
  shippingDays: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ITEM_RELEASE_SET_TITLE: {
      const { title } = action;
      const titleLength = title.length;
      const isTitleOverLength = titleLength > titleLimit;
      return Object.assign({}, state, { title, titleLength, isTitleOverLength });
    }
    case TYPES.ITEM_RELEASE_SET_DESCRIPTION: {
      const { descript } = action;
      const descriptLength = descript.replace(/\n/g, '').length;
      const isDescriptOverLength = descriptLength > descriptLimit;
      return Object.assign({}, state, {
        descript,
        descriptLength,
        isDescriptOverLength,
      });
    }
    case TYPES.ITEM_RELEASE_FORM_SET_CITY: {
      const { city } = action;
      return Object.assign({}, state, { city });
    }
    case TYPES.ITEM_RELEASE_FORM_SET_SHIPPING: {
      const { shipping } = action;
      return Object.assign({}, state, { shipping });
    }
    case TYPES.ITEM_RELEASE_FORM_SET_SHIPPING_DAYS: {
      const { shippingDays } = action;
      return Object.assign({}, state, { shippingDays });
    }
    default:
      return state;
  }
};
