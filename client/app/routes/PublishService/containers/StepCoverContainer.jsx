import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { publishService as router } from 'lib/paths';
import Step1Cover from '../components/StepCover';
import {
  createCover,
  deleteCover,
  changeOrders,
  uploadCover,
  processRawCovers,
} from '../modules/covers';
import { openCropper, closeCropper } from '../modules/cropper';

/* pick props */
const mapStateToProps = ({ environment, publish, publishCovers, cropper }) => ({
  environment, publish, publishCovers, cropper,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchCreateCover: blob => dispatch(createCover(blob)),
  dispatchDeleteCover: key => dispatch(deleteCover(key)),
  dispatchChangeOrders: covers => dispatch(changeOrders(covers)),
  dispatchOpenCropper: (key, blob) => dispatch(openCropper(key, blob)),
  dispatchCloseCropper: () => dispatch(closeCropper()),
  dispatchUploadCover: (key, base64) => dispatch(uploadCover(key, base64)),
  dispatchProcessRawCovers: () => dispatch(processRawCovers()),
  nextStep: () => browserHistory.push(router.aboutPath),
});

export default connect(mapStateToProps, mapDispatchToProps)(Step1Cover);
