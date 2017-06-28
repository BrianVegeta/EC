import { checkCurrentUser } from '../../actions/authActions';

export default dispatch => ({
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const component = require('./Container').default;
      callback(null, { main: component });
    }, 'home');
  },
  onEnter: () => {
    dispatch(checkCurrentUser());
  },
});
