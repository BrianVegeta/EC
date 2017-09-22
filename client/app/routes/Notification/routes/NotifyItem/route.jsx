import { injectReducer } from 'reducers';
import { notifyPath } from 'lib/paths';

export default store => ({
  path: notifyPath.itemNotifyPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/NotifyItemContainers').default;
      const detailreducer = require('../../modules/notification').default;
      injectReducer(store, { key: 'notify', reducer: detailreducer });
      cb(null, Container);
    }, 'notify.item');
  },
});
