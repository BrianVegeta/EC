import { fetchItems, reset } from 'actions/itemsActions';
import {
  CATEGORY_GOODS,
  CATEGORY_GOODS_ID,
} from 'constants/enums';


export default (routesHelper, dispatch) => ({
  path: `${routesHelper.items.root}/goods`,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const component = require('./Container').default;
      callback(null, { main: component });
    });
  },
  onEnter: () => {
    dispatch(reset());
    dispatch(fetchItems(CATEGORY_GOODS_ID));
  },
});
