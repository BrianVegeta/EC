import { connect } from 'react-redux';

import { popupScoreRating } from 'modules/popup';
import { doAccept, doCancel, doReject,
  doShipGoods, doReturn, doReceiveConfirm,
  doScore, doEndOrder, resetAction } from 'modules/orderAction';

import Orderdetail from '../components/Orderdetail';
import { fetchOrder, reset } from '../modules/orderdetail';


const mapStateToProps = ({ environment, orderdetail, auth }) => ({
  environment, orderdetail, auth,
});

const refetch = (dispatch, { cid }) => {
  dispatch(reset());
  dispatch(resetAction());
  dispatch(fetchOrder(cid));
};

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatch,
  dispatchPopupScore: (isView, targetName, targetScore, targetComment, targetUrl) =>
    dispatch(popupScoreRating({
      isView,
      targetName,
      targetScore,
      targetComment,
      targetUrl,
      onScore: (score, comment) => {
        dispatch(doScore(params.cid, score, comment))
        .then(() => refetch(dispatch, params))
        .catch((error) => {
          alert(error);
        });
      },
    }),
  ),
  dispatchRecords: () => dispatch(fetchOrder(params.cid)),
  dispatchReset: () => dispatch(reset()),
  dispatchResetAction: () => dispatch(resetAction()),
  dispatchAccept: () => {
    dispatch(doAccept(params.cid))
    .then(() => refetch(dispatch, params))
    .catch((error) => {
      alert(error);
    });
  },
  dispatchCancel: () => {
    dispatch(doCancel(params.cid))
    .then(() => refetch(dispatch, params))
    .catch((error) => {
      alert(error);
    });
  },
  dispatchReject: () => {
    dispatch(doReject(params.cid))
    .then(() => refetch(dispatch, params))
    .catch((error) => {
      alert(error);
    });
  },
  dispatchShipGoods: () => {
    dispatch(doShipGoods(params.cid))
    .then(() => refetch(dispatch, params))
    .catch((error) => {
      alert(error);
    });
  },
  dispatchReturn: () => {
    dispatch(doReturn(params.cid))
    .then(() => refetch(dispatch, params))
    .catch((error) => {
      alert(error);
    });
  },
  dispatchReceiveConfirm: () => {
    dispatch(doReceiveConfirm(params.cid))
    .then(() => refetch(dispatch, params))
    .catch((error) => {
      alert(error);
    });
  },
  dispatchEndService: () => {
    dispatch(doEndOrder('SERVICE', params.cid))
    .then(() => refetch(dispatch, params))
    .catch((error) => {
      alert(error);
    });
  },
  dispatchEndSpace: () => {
    dispatch(doEndOrder('SPACE', params.cid))
    .then(() => refetch(dispatch, params))
    .catch((error) => {
      alert(error);
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Orderdetail);
