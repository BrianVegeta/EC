import { injectReducer, removeReducer } from 'reducers';
import { editItem } from './modules/item';

// export default dispatch => ({
//   path: '/p/:name-i.:id',
//   getComponent(_nextState, callback) {
//     require.ensure([], (require) => {
//       callback(null, {
//         main: require('./Container').default,
//       });
//     }, 'item');
//   },
//   onEnter: (nextState) => {
//     dispatch(syncCurrentUser());
//     dispatch(editItem(nextState.params.id));
//   },
// });

const key = 'item';
export default store => ({
  path: '/p/:name-i.:id',

  onEnter: (nextState) => {
    const { dispatch } = store;
    const { id } = nextState.params;

    dispatch(editItem(id));
  },

  onLeave: () => {
    removeReducer(store, { key });
  },

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/Container').default;
      const reducer = require('./modules/item').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'item');
  },
});
