import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { detail as orderRouter } from 'lib/paths';

import { sendSueReport } from '../modules/sueAction';
import { fetchOrder, reset } from '../modules/sueDetail';
import { createCover, deleteCover, changeOrders, processRawCovers }
  from '../modules/sueGallery';

import SueForm from '../components/SueForm';

const mapStateToProps = ({ environment, sueDetail, sueAction, sueGallery, auth }) => ({
  environment, sueDetail, sueAction, sueGallery, currentUser: auth.currentUser,
});

/* pick dispatch */
const returnLastPath = cid =>
  (dispatch, getState) => {
    const { routing: { locationBeforeTransitions } } = getState();
    const { state, pathname } = locationBeforeTransitions;
    if (state && state.referrer && state.referrer !== pathname) {
      browserHistory.push(state.referrer);
    } else {
      orderRouter.orderPath(cid);
    }
  };
const mapDispatchToProps = (dispatch, { params: { cid } }) => ({
  dispatch,
  dispatchRecords: () => dispatch(fetchOrder(cid)),
  dispatchSend: (pid, targetstage, reason, targetUid, type) => {
    dispatch(processRawCovers()).then((imgData) => {
      dispatch(sendSueReport(
        cid, pid, imgData, targetstage,
        reason, targetUid, type,
      )).then(dispatch(returnLastPath(cid)));
    }
  )
  },
  dispatchReset: () => dispatch(reset()),
  dispatchCreateCover: (blob, cidNo) => dispatch(createCover(blob, cidNo)),
  dispatchDeleteCover: key => dispatch(deleteCover(key)),
  dispatchChangeOrders: covers => dispatch(changeOrders(covers)),
  dispatchCancel: () => {
    dispatch(returnLastPath(cid));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SueForm);
