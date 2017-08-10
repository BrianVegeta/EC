import { injectReducer } from 'reducers';

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

export default store => ({
  path: '/p/:name-i.:pid',

  /*
  onEnter: (nextState) => {
    const { dispatch } = store;
    const { pid } = nextState.params;
    dispatch(editItem(pid));
  },
  onLeave: () => {
    removeReducer(store, { key });
  },*/

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/Container').default;
      const itemReducer = require('./modules/item').default;
      const messageReducer = require('./modules/messageboard').default;
      injectReducer(store, { key: 'item', reducer: itemReducer });
      injectReducer(store, { key: 'messageboard', reducer: messageReducer });
      cb(null, Container);
    }, 'item');
  },
});
