import { fetchUser, fetchWishList } from './modules/actions';

export default ({ dispatch }) => ({
  path: '/p/ownerprofile/:uid',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const component = require('./Container').default;
      callback(null, { main: component });
    }, 'items-space');
  },
  onEnter: (nextState) => {
    // dispatch(fafaf())
    dispatch(fetchUser(nextState.params.uid));
    dispatch(fetchWishList(nextState.params.uid));
  },
});
