import { connect } from 'react-redux';
import {
  connect as chatConnect,
  sendMessage,
  uploadPhoto,
  selectItem,
  fetchMyItems,
  fetchTargetItems,
  sendXmppRead,
} from 'modules/chat';
import {
  fetchRooms,
} from 'modules/chatRooms';
import {
  fetchLogs,
  changeChatTarget,
  changeInput,
  reset as resetBox,
} from 'modules/chatBox';
import ChatRoom from './index';


/* pick props */
const mapStateToProps = ({
  environment, auth: { currentUser }, chat, chatRooms, chatBox,
}) => ({
  environment,
  currentUser,
  chat,
  chatRooms,
  chatBox,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch) => {
  return ({
    dispatchResetBox: () => dispatch(resetBox()),
    dispatchFetchChatRoom: () => dispatch(fetchRooms()),
    dispatchConnect: () => dispatch(chatConnect()),
    dispatchFetchLogs: targetUid => dispatch(fetchLogs(targetUid)),
    dispatchChangeChatTarget: (room, user) =>
      dispatch(changeChatTarget(room, user)),
    dispatchChangeInput: input => dispatch(changeInput(input)),
    dispatchSendMessage: () => dispatch(sendMessage()),
    dispatchUploadPhoto: blob => dispatch(uploadPhoto(blob)),
    dispatchSelectItem: ({ pid, pname, price, img }) =>
      dispatch(selectItem({ pid, pname, price, img })),
    dispatchFetchMyItems: () => dispatch(fetchMyItems()),
    dispatchFetchTargetItems: () => dispatch(fetchTargetItems()),
    dispatchSendXmppRead: () => dispatch(sendXmppRead()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
