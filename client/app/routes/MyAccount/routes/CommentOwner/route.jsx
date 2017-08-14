import { injectReducer } from 'reducers';

const key = 'myComment';
export default store => ({
  path: 'comment-owner',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/CommentOwnerContainer').default;
      const reducer = require('../../modules/myComment').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'my.comment.owner');
  },
});
