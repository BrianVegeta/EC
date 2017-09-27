import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { publishGoodsRouter } from 'lib/paths';
import Step1Cover from '../components/StepCover';
import {
  REDUCER_KEY as COVERS_REDUCER_KEY,
  createCover,
  deleteCover,
  changeOrders,
  uploadCover,
  processRawCovers,
} from '../modules/covers';
import { REDUCER_KEY, touchPath } from '../modules/publish';
import {
  REDUCER_KEY as CROPPER_REDUCER_KEY,
  openCropper,
  closeCropper,
} from '../modules/cropper';


const { coverPath, aboutPath } = publishGoodsRouter;
/* pick props */
const mapStateToProps = ({
  environment,
  [REDUCER_KEY]: publish,
  [COVERS_REDUCER_KEY]: covers,
  [CROPPER_REDUCER_KEY]: cropper,
}) => ({
  environment, publish, covers, cropper,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { location: { query } }) => {
  const { pid } = query;
  return ({
    dispatchCreateCover: blob => dispatch(createCover(blob)),
    dispatchDeleteCover: key => dispatch(deleteCover(key)),
    dispatchChangeOrders: covers => dispatch(changeOrders(covers)),
    dispatchOpenCropper: (key, blob) => dispatch(openCropper(key, blob)),
    dispatchCloseCropper: () => dispatch(closeCropper()),
    dispatchUploadCover: (key, base64) => dispatch(uploadCover(key, base64)),
    dispatchProcessRawCovers: () => dispatch(processRawCovers()),

    dispatchTouchPath: () => dispatch(touchPath(coverPath(pid))),
    nextStep: () => browserHistory.push(aboutPath(pid)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Step1Cover);
