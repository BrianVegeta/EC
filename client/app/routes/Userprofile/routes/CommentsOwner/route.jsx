import { injectReducer } from 'reducers';

const key = 'userprofileComments';
export default store => ({
  path: 'comments-owner',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/CommentsOwnerContainer').default;
      const reducer = require('../../modules/userprofileComments').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'userprofile.comments.owner');
  },
});
