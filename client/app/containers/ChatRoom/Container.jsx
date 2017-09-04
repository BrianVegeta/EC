import { connect } from 'react-redux';
import {
  fetchChatRoom,
} from 'modules/chat';
import ChatRoom from './index';


/* pick props */
const mapStateToProps = (
  { environment, chat },
) => ({
  environment,
  chat,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch) => {
  return ({
    dispatchFetchChatRoom: () => dispatch(fetchChatRoom()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
