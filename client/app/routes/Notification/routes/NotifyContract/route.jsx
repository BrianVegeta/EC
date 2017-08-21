import { injectReducer } from 'reducers';
import { notifyPath } from 'lib/paths';

export default store => ({
  path: notifyPath.contractNotifyPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/NotifyContractContainers').default;
      const detailreducer = require('../../modules/notification').default;
      injectReducer(store, { key: 'notify', reducer: detailreducer });
      cb(null, Container);
    }, 'notify.contract');
  },
});
