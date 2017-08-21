import { injectReducer } from 'reducers';

export default store => ({
  path: '/p/sue-form/:cid',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SueContainer').default;
      const detailreducer = require('./modules/sueDetail.jsx').default;
      const actionreducer = require('./modules/sueAction.jsx').default;
      const galleryreducer = require('./modules/sueGallery.jsx').default;
      injectReducer(store, { key: 'sueAction', reducer: actionreducer });
      injectReducer(store, { key: 'sueDetail', reducer: detailreducer });
      injectReducer(store, { key: 'sueGallery', reducer: galleryreducer });
      cb(null, Container);
    }, 'sueform');
  },
});
