import { connect } from 'react-redux';
import { addToChatRoom } from 'modules/chatRooms';
import { closePopup } from 'modules/popup';
import { redirectToLogin } from 'lib/redirect';
import Component from './index';

const mapStateToProps = ({ environment, auth }) => ({
  environment,
  auth,
});

/* pick dispatch */
const mapDispatchToProps = (
  dispatch,
  { card: { uid, user_name: name, user_img: picture } },
) => {
  const dispatchClose = () => dispatch(closePopup());
  return {
    dispatchClose,
    dispatchAddToChatRoom: () => {
      dispatchClose(); // close modal
      dispatch(
        addToChatRoom({ uid, name, picture }),
      ); // open chat
    },
    dispatchRedirectToLogin: () => {
      dispatchClose();
      dispatch(redirectToLogin());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
