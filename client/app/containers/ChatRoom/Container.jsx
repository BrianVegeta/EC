import { connect } from 'react-redux';
import {
  connect as chatConnect,
} from 'modules/chat';
import {
  fetchRooms,
} from 'modules/chatRooms';
import {
  fetchLogs,
  changeChatTarget,
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
    dispatchFetchChatRoom: () => dispatch(fetchRooms()),
    dispatchConnect: () => dispatch(chatConnect()),
    dispatchFetchLogs: targetUid => dispatch(fetchLogs(targetUid)),
    dispatchChangeChatTarget: ({ uid }) => dispatch(changeChatTarget({ uid })),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
