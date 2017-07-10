import { syncCurrentUser } from '../../actions/authActions';
import { editItem } from '../../actions/itemActions';

export default dispatch => ({
  path: '/p/:name-i.:id',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        main: require('./Container').default,
      });
    }, 'item');
  },
  onEnter: (nextState) => {
    dispatch(syncCurrentUser());
    dispatch(editItem(nextState.params.id));
  },
});
