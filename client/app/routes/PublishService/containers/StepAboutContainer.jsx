import { connect } from 'react-redux';

import StepAbout from '../components/StepAbout';
// import {
//   createCover,
//   deleteCover,
//   changeOrders,
//   uploadCover,
//   processRawCovers,
// } from '../modules/covers';
// import { openCropper, closeCropper } from '../modules/cropper';

/* pick props */
const mapStateToProps = ({ environment, publish, publishCovers, cropper }) => ({
  environment, publish, publishCovers, cropper,
});

/* pick dispatch */
// const mapDispatchToProps = dispatch => ({
//   dispatchCreateCover: blob => dispatch(createCover(blob)),
//   dispatchDeleteCover: key => dispatch(deleteCover(key)),
//   dispatchChangeOrders: covers => dispatch(changeOrders(covers)),
//   dispatchOpenCropper: (key, blob) => dispatch(openCropper(key, blob)),
//   dispatchCloseCropper: () => dispatch(closeCropper()),
//   dispatchUploadCover: (key, base64) => dispatch(uploadCover(key, base64)),
//   dispatchProcessRawCovers: () => dispatch(processRawCovers()),
// });

export default connect(mapStateToProps)(StepAbout);
