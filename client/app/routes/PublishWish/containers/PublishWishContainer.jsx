import { connect } from 'react-redux';
import { wishRouter } from 'lib/paths';
import { browserHistory } from 'react-router';
import Container from '../components/PublishWish';
import {
  reset, savePublish, editPublish, changeData,
  changeTopCategory, validateWish, uploadPhoto,
} from '../modules/publish';

import {
  REDUCER_KEY as WISH_COVER_CROPPER,
  openCropper,
  closeCropper,
} from '../modules/avatarCropper';

const mapStateToProps = ({
  environment, publishWish, [WISH_COVER_CROPPER]: avatarCropper, routingHelper },
) => ({
  environment, publishWish, avatarCropper, routingHelper,
});
/* pick dispatch */
const mapDispatchToProps = (dispatch, { location: { query } }) => ({
  dispatch,
  dispatchChangeData: data => dispatch(changeData(data)),
  dispatchChangeTopCat: topCategory => dispatch(changeTopCategory(topCategory)),
  dispatchValidate: () => dispatch(validateWish()),
  dispatchSave: () => dispatch(savePublish()),
  dispatchReset: () => dispatch(reset()),
  redirectToWish: () => browserHistory.push(wishRouter.indexPath),
  dispatchOpenCropper: blob => dispatch(openCropper(blob)),
  dispatchCloseCropper: () => dispatch(closeCropper()),
  dispatchUploadAvatar: blob => dispatch(uploadPhoto(blob)),
  dispatchCheckEdit: () => {
    const { id } = query;
    if (id) dispatch(editPublish(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
