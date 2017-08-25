import { injectReducer } from 'reducers';
import { my } from 'lib/paths';

const key = 'myComment';
export default store => ({
  path: my.commentLesseePath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/CommentLesseeContainer').default;
      const reducer = require('../../modules/myComment').default;

      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'my.comment.lessee');
  },
});
