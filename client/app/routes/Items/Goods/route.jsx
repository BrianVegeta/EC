import { fetchItems, reset } from 'actions/itemsActions';
import {
  CATEGORY_GOODS,
  CATEGORY_GOODS_ID,
} from 'constants/enums';


export default ({ dispatch }) => ({
  path: `/p/i/${CATEGORY_GOODS}`,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const component = require('./Container').default;
      callback(null, { main: component });
    });
  },
  onEnter: () => {
    dispatch(fetchItems(CATEGORY_GOODS_ID));
  },
  onLeave: () => {
    dispatch(reset());
  },
});
