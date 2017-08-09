import { injectReducer } from 'reducers';

const key = 'userprofileComments';
export default store => ({
  path: 'comments-lessee',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/CommentsLesseeContainer').default;
      const reducer = require('../../modules/userprofileComments').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'userprofile.comments.lessee');
  },
});
