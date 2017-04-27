import * as TITLE from './constants/title';
import { setTitle } from '../../actions/releaseActions';

const getCoverComponent = dispatch => ({
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const formComponent = require('./StepCover/Container').default;
      callback(null, { formComponent });
    });
  },
  onEnter: () => dispatch(setTitle(TITLE.UPLOAD_COVER)),
});

const getAboutComponent = (dispatch, path) => ({
  path,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const formComponent = require('./StepAbout/Container').default;
      callback(null, { formComponent });
    });
  },
  onEnter: () => dispatch(setTitle(TITLE.ABOUT)),
});

module.exports = {
  getAboutComponent,
  getCoverComponent,
};
