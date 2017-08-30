import { connect } from 'react-redux';
import { wishRouter } from 'lib/paths';
import { browserHistory } from 'react-router';
import Container from '../components/PublishWish';
import { reset, savePublish, editPublish, changeData, changeTopCategory, validateWish } from '../modules/publish';


const mapStateToProps = ({
  environment, publishWish, avatarCropper, routingHelper }, { params },
  ) => ({
    environment, publishWish, avatarCropper, id: params.id, routingHelper,
  });
/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatch,
  dispatchChangeData: data => dispatch(changeData(data)),
  dispatchChangeTopCat: topCategory => dispatch(changeTopCategory(topCategory)),
  dispatchValidate: () => dispatch(validateWish()),
  dispatchSave: () => dispatch(savePublish()),
  dispatchEdit: () => dispatch(editPublish(params.id)),
  dispatchReset: () => dispatch(reset()),
  redirectToWish: () => browserHistory.push(wishRouter.indexPath),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
