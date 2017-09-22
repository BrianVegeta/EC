import React from 'react';
import PropTypes from 'prop-types';
import { sumBy } from 'lodash';
// import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import ChatBox from './ChatBox';


// const cx = classnames.bind(styles);
class ChatRoom extends React.Component {

  static propTypes = {
    dispatchOpenChat: PropTypes.func.isRequired,
    dispatchResetBox: PropTypes.func.isRequired,
    dispatchFetchChatRoom: PropTypes.func.isRequired,
    dispatchConnect: PropTypes.func.isRequired,
    dispatchChangeChatTarget: PropTypes.func.isRequired,
    dispatchChangeInput: PropTypes.func.isRequired,
    dispatchSendMessage: PropTypes.func.isRequired,
    dispatchUploadPhoto: PropTypes.func.isRequired,
    dispatchSelectItem: PropTypes.func.isRequired,
    dispatchFetchMyItems: PropTypes.func.isRequired,
    dispatchFetchTargetItems: PropTypes.func.isRequired,
    dispatchSendXmppRead: PropTypes.func.isRequired,
    chat: PropTypes.shape({
      isConnected: PropTypes.bool.isRequired,
    }).isRequired,
    chatBox: PropTypes.shape({
      currentUser: PropTypes.object,
      logs: PropTypes.array,
    }).isRequired,
    chatRooms: PropTypes.shape({
      rooms: PropTypes.array.isRequired,
    }).isRequired,
    currentUser: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    console.log('mount');
    this.props.dispatchFetchChatRoom();
    this.props.dispatchConnect();
  }

  componentWillUnmount() {
    console.log('unmount');
  }

  renderTalkButton() {
    const {
      dispatchOpenChat,
      chatRooms: { rooms },
    } = this.props;
    const sumUnreadCount = sumBy(rooms, room => room.unread_message_count);
    return (
      <div
        styleName="talk-button"
        role="button"
        tabIndex="-1"
        onClick={() => dispatchOpenChat(true)}
      >
        聊天室
        {sumUnreadCount > 0 &&
          <div styleName="count">
            {(sumUnreadCount > 99) ? '99+' : sumUnreadCount}
          </div>
        }
      </div>
    );
  }

  renderChatRomm() {
    const {
      dispatchOpenChat,
      dispatchResetBox,
      dispatchSendMessage,
      dispatchUploadPhoto,
      dispatchSelectItem,
      dispatchFetchChatRoom,
      dispatchChangeChatTarget,
      dispatchChangeInput,
      dispatchFetchMyItems,
      dispatchFetchTargetItems,
      dispatchSendXmppRead,
      chatRooms,
      chatBox,
      currentUser,
    } = this.props;
    return (
      <ChatBox
        dispatchResetBox={dispatchResetBox}
        dispatchSendMessage={dispatchSendMessage}
        dispatchUploadPhoto={dispatchUploadPhoto}
        dispatchSelectItem={dispatchSelectItem}
        dispatchFetchChatRoom={dispatchFetchChatRoom}
        dispatchChangeChatTarget={dispatchChangeChatTarget}
        dispatchChangeInput={dispatchChangeInput}
        dispatchFetchMyItems={dispatchFetchMyItems}
        dispatchFetchTargetItems={dispatchFetchTargetItems}
        dispatchSendXmppRead={dispatchSendXmppRead}
        chatBox={chatBox}
        chatRooms={chatRooms}
        currentUser={currentUser}
        closeBox={() => dispatchOpenChat(false)}
      />
    );
  }

  render() {
    const { chat: { isConnected, isOpen } } = this.props;
    if (!isConnected) return null;
    return (
      <div styleName="container">
        {isOpen ? this.renderChatRomm() : this.renderTalkButton()}
      </div>
    );
  }
}

export default CSS(ChatRoom, styles);
