import * as TYPES from '../constants/actionTypes/home';

const initialState = {
  goods: [],
  service: [],
  space: [],
  vendors: [],
  categories: [],
  banners: [],
};
const home = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.STARTUP: {
      const { items, vendors, banners, categories } = action;
      const goods = items[0].item;
      const service = items[1].item;
      const space = items[2].item;
      return Object.assign({}, state, { goods, service, space, vendors, banners, categories });
    }
    default:
      return state;
  }
};
export default home;
