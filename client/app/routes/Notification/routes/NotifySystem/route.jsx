import { injectReducer } from 'reducers';
import { notifyPath } from 'lib/paths';

export default store => ({
  path: notifyPath.systemNotifyPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/NotifySystemContainers').default;
      const detailreducer = require('../../modules/notification').default;
      injectReducer(store, { key: 'notify', reducer: detailreducer });
      cb(null, Container);
    }, 'notify.sytem');
  },
});
