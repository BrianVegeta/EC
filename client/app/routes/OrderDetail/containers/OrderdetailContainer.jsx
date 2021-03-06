import { connect } from 'react-redux';
import { addToChatRoom } from 'modules/chatRooms';
import { popupScoreRating, popupAccessCheck,
  popupBankInfoSetup, popupATMBank, popupSevenNo, popupSevenLog } from 'modules/popup';
import swal, { errorConfig } from 'lib/swal';
import {
  doAccept,
  doCancel,
  doReject,
  doShipGoods, doReturn, doReceiveConfirm,
  doScore, doEndOrder, resetAction, doCreditCardPayment,
  doATMPayment, getShipOrder, getShipLog, uploadImage,
} from '../modules/orderaction';
import { createCover, deleteCover, processRawCovers }
  from '../modules/ordergallery';
import Orderdetail from '../components/Orderdetail';
import { fetchOrder, updatingImage, updateImages, reset } from '../modules/orderdetail';


const mapStateToProps = ({ environment, orderdetail, auth, personalBankInfo, ordergallery }) => ({
  environment, orderdetail, auth, personalBankInfo, ordergallery,
});

const refetch = (dispatch, { cid }) => {
  dispatch(reset());
  dispatch(resetAction());
  dispatch(fetchOrder(cid));
};


/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => {
  /* DISPATCH 查看銀行 */
  const popupBankSetup = password =>
    dispatch(popupBankInfoSetup({ password }));
  const dispatchBankSetup = () => {
    dispatch(popupAccessCheck({
      onChecked: popupBankSetup,
    }));
  };

  return ({
    dispatch,
    dispatchAddToChatRoom: ({ uid, name, picture }) =>
      dispatch(addToChatRoom({ uid, name, picture })),
    dispatchBankSetup,
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
        swal(errorConfig({ title: '失敗', text: error }));
      });
    },
    dispatchCancel: () => {
      dispatch(doCancel(params.cid)).then(() => refetch(dispatch, params))
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
    dispatchPaymentInfo: () => {
      const options = {};
      dispatch(popupATMBank(options));
      dispatch(doATMPayment(params.cid));
    },
    dispatchSevenOrder: (type) => {
      const options = {};
      dispatch(popupSevenNo(options));
      dispatch(getShipOrder(params.cid, type));
    },
    dispatchSevenLog: (orderNo) => {
      const options = { orderNo };
      dispatch(popupSevenLog(options));
      dispatch(getShipLog(orderNo));
    },
    dispatchPaymentCreditCard: () => {
      dispatch(doCreditCardPayment(params.cid))
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
    dispatchCreateCover: blob => dispatch(createCover(blob, params.cid)),
    dispatchDeleteCover: key => dispatch(deleteCover(key)),
    dispatchUploadCover: (type) => {
      dispatch(updatingImage());
      dispatch(processRawCovers(type))
      .then(imageResult => dispatch(uploadImage(params.cid, type, imageResult))
      .then(() => dispatch(updateImages(type, imageResult))));
    },
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Orderdetail);
