import React from 'react';
import PropTypes from 'prop-types';
import { sumBy } from 'lodash';
import IconMinus from 'react-icons/lib/ti/minus';
import IconDetail from 'react-icons/lib/md/description';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import UserList from './UserList';
import MessageBox from './MessageBox';
import InputBox from './InputBox';
import SearchInput from './SearchInput';
import ChatBox from './ChatBox';


const cx = classnames.bind(styles);
class ChatRoom extends React.Component {

  static propTypes = {
    dispatchResetBox: PropTypes.func.isRequired,
    dispatchFetchChatRoom: PropTypes.func.isRequired,
    dispatchConnect: PropTypes.func.isRequired,
    dispatchFetchLogs: PropTypes.func.isRequired,
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

  static renderMinus() {
    return <IconMinus size={20} className={cx('minus')} />;
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    console.log('mount');
    this.props.dispatchFetchChatRoom();
    this.props.dispatchConnect();
  }

  componentWillUnmount() {
    console.log('unmount');
  }

  renderTalkButton() {
    const { chatRooms: { rooms } } = this.props;
    const sumUnreadCount = sumBy(rooms, room => room.unread_message_count);
    return (
      <div
        styleName="talk-button"
        role="button"
        tabIndex="-1"
        onClick={() => this.setState({ isOpen: true })}
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
        closeBox={() => this.setState({ isOpen: false })}
      />
    );
  }

  render() {
    const { isOpen } = this.state;
    const { chat: { isConnected } } = this.props;
    if (!isConnected) return null;
    return (
      <div styleName="container">
        {isOpen ? this.renderChatRomm() : this.renderTalkButton()}
      </div>
    );
  }
}

export default CSS(ChatRoom, styles);
