import { connect } from 'react-redux';
import { addToChatRoom } from 'modules/chatRooms';
import { redirectToLogin } from 'lib/redirect';
import { fetchRecord, reset } from '../modules/wish';
import Component from '../components/index';

const mapStateToProps = ({ environment, auth, wishDetail }) => ({
  environment,
  auth,
  wishDetail,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatchRecord: () => dispatch(fetchRecord(params.id)),
  dispatchReset: () => dispatch(reset()),
  dispatchAddToChatRoom: ({ uid, name, picture }) => {
    dispatch(
      addToChatRoom({ uid, name, picture }),
    );
  },
  dispatchRedirectToLogin: () => {
    dispatch(redirectToLogin());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
