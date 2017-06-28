import { checkCurrentUser } from '../../actions/authActions';
import { startup } from '../../actions/homeActions';

export default dispatch => ({
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const component = require('./Container').default;
      callback(null, { main: component });
    }, 'home');
  },
  onEnter: () => {
    dispatch(checkCurrentUser());
    dispatch(startup());
  },
});
