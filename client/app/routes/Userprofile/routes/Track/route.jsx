import { injectReducer } from 'reducers';

const key = 'userprofileTrack';

export default store => ({
  path: 'track',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/TrackContainer').default;
      const reducer = require('../../modules/userprofileTrack').default;
      injectReducer(store, { key, reducer });

      cb(null, Container);
    }, 'userprofile.track');
  },
});
