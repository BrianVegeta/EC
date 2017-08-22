import { injectReducer } from 'reducers';
import { notifyPath } from 'lib/paths';

export default store => ({
  path: notifyPath.activityNotifyPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/NotifyActivityContainers').default;
      const detailreducer = require('../../modules/notification').default;
      injectReducer(store, { key: 'notify', reducer: detailreducer });
      cb(null, Container);
    }, 'notify.activity');
  },
});
