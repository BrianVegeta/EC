import * as TYPES from '../constants/actionTypes';
import formReducer from './itemReleaseFormReducer';

const initialState = {
  form: formReducer(undefined, { type: null }),
};
export default (state = initialState, action) => {
  const { form } = state;
  switch (action.type) {
    case TYPES.ITEM_RELEASE_SET_TITLE:
      return Object.assign({}, state, { form: formReducer(form, action) });
    case TYPES.ITEM_RELEASE_SET_DESCRIPTION:
      return Object.assign({}, state, { form: formReducer(form, action) });
    case TYPES.ITEM_RELEASE_FORM_SET_CITY:
      return Object.assign({}, state, { form: formReducer(form, action) });
    case TYPES.ITEM_RELEASE_FORM_SET_SHIPPING:
      return Object.assign({}, state, { form: formReducer(form, action) });
    case TYPES.ITEM_RELEASE_FORM_SET_SHIPPING_DAYS:
      return Object.assign({}, state, { form: formReducer(form, action) });
    default:
      return state;
  }
};
