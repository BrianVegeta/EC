import { connect } from 'react-redux';
import {
  connect as chatConnect,
} from 'modules/chat';
import {
  fetchRooms,
} from 'modules/chatRooms';
import ChatRoom from './index';


/* pick props */
const mapStateToProps = (
  { environment, chat, chatRooms },
) => ({
  environment,
  chat,
  chatRooms,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch) => {
  return ({
    dispatchFetchChatRoom: () => dispatch(fetchRooms()),
    dispatchConnect: () => dispatch(chatConnect()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
