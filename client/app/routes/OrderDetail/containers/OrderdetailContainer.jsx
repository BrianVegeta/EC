import { connect } from 'react-redux';

import { popupScoreRating } from 'modules/popup';

import Orderdetail from '../components/Orderdetail';
import { fetchOrder, reset } from '../modules/orderdetail';
import { doAccept, doCancel, doReject, doShipGoods,
   doReturnConfirm, resetAction } from '../modules/orderaction';

const mapStateToProps = ({ environment, orderdetail, orderaction, auth }) => ({
  environment, orderdetail, orderaction, auth,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatch,
  dispatchPopupScore: () => dispatch(popupScoreRating()),
  dispatchRecords: () => dispatch(fetchOrder(params.cid)),
  dispatchReset: () => dispatch(reset()),
  dispatchResetAction: () => dispatch(resetAction()),
  dispatchAccept: () => {
    dispatch(doAccept(params.cid))
    .then(() => {
      dispatch(reset());
      dispatch(resetAction());
      dispatch(fetchOrder(params.cid));
    })
    .catch((error) => {
      alert(error);
    });
  },
  dispatchCancel: () => {
    dispatch(doCancel(params.cid))
    .then(() => {
      dispatch(reset());
      dispatch(resetAction());
      dispatch(fetchOrder(params.cid));
    })
    .catch((error) => {
      alert(error);
    });
  },
  dispatchReject: () => {
    dispatch(doReject(params.cid))
    .then(() => {
      dispatch(reset());
      dispatch(resetAction());
      dispatch(fetchOrder(params.cid));
    })
    .catch((error) => {
      alert(error);
    });
  },
  dispatchShipGoods: () => {
    dispatch(doShipGoods(params.cid))
    .then(() => {
      dispatch(reset());
      dispatch(resetAction());
      dispatch(fetchOrder(params.cid));
    })
    .catch((error) => {
      alert(error);
    });
  },
  dispatchReturnConfirm: () => {
    dispatch(doReturnConfirm(params.cid))
    .then(() => {
      dispatch(reset());
      dispatch(resetAction());
      dispatch(fetchOrder(params.cid));
    })
    .catch((error) => {
      alert(error);
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Orderdetail);
