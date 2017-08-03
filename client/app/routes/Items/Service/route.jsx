import { fetchItems, reset } from 'actions/itemsActions';
import {
  CATEGORY_SERVICE,
  CATEGORY_SERVICE_ID,
} from 'constants/enums';


export default ({ dispatch }) => ({
  path: `/p/i/${CATEGORY_SERVICE}`,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const component = require('./Container').default;
      callback(null, { main: component });
    }, 'items-service');
  },
  onEnter: () => {
     dispatch(reset());
    dispatch(
      fetchItems(CATEGORY_SERVICE_ID),
    );
  },
});
