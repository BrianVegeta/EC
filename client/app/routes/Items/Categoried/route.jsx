import { fetchItems, reset } from 'actions/itemsActions';

export default ({ dispatch }) => ({
  path: '/p/i/:name-c.:id',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        main: require('./Container').default,
      });
    });
  },
  onEnter: (nextState) => {
    dispatch(fetchItems(nextState.params.id));
  },
  onLeave: () => {
    dispatch(reset());
  },
});
