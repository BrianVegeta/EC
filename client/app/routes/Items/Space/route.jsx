import { fetchItems, reset } from 'actions/itemsActions';
import {
  CATEGORY_SPACE,
  CATEGORY_SPACE_ID,
} from 'constants/enums';


export default ({ dispatch }) => ({
  path: `/p/i/${CATEGORY_SPACE}`,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const component = require('./Container').default;
      callback(null, { main: component });
    }, 'items-space');
  },
  onEnter: () => {
    dispatch(reset());
    dispatch(
      fetchItems(CATEGORY_SPACE_ID),
    );
  },
});
