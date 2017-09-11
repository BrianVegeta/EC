import React from 'react';
import PropTypes from 'prop-types';
import IconMinus from 'react-icons/lib/ti/minus';
import IconDetail from 'react-icons/lib/md/description';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import UserList from './UserList';
import MessageBox from './MessageBox';
import InputBox from './InputBox';
import SearchInput from './SearchInput';


const cx = classnames.bind(styles);
class ChatRoom extends React.Component {

  static propTypes = {
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
    chat: PropTypes.object.isRequired,
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
    this.onRoomToggle = this.onRoomToggle.bind(this);
    this.onMessageSend = this.onMessageSend.bind(this);
    this.onPhotoSend = this.onPhotoSend.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
  }

  componentDidMount() {
    console.log('mount');
    this.props.dispatchFetchChatRoom();
    this.props.dispatchConnect();
  }

  componentDidUpdate({ chatBox }) {
    if (chatBox.logs.length !== this.props.chatBox.logs.length) {
      if (this.messageBox) {
        this.messageBox.scrollBottom();
      }
    }
  }

  componentWillUnmount() {
    console.log('unmount');
  }

  onRoomToggle() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  onMessageSend() {
    this.props.dispatchSendMessage();
    this.messageBox.scrollBottom();
  }

  onPhotoSend(blob) {
    this.props.dispatchUploadPhoto(blob);
    this.messageBox.scrollBottom();
  }

  onItemSelect({ pid, pname, price, img }) {
    this.props.dispatchSelectItem({ pid, pname, price, img });
    this.messageBox.scrollBottom();
  }

  renderTalkButton() {
    return (
      <div
        styleName="talk-button"
        role="button"
        tabIndex="-1"
        onClick={this.onRoomToggle}
      >
        聊天室
      </div>
    );
  }

  renderChatRomm() {
    const {
      renderMinus,
    } = this.constructor;
    const {
      dispatchFetchChatRoom,
      dispatchChangeChatTarget,
      dispatchChangeInput,
      dispatchFetchMyItems,
      dispatchFetchTargetItems,
      dispatchSendXmppRead,
      chatRooms,
      chatBox: { currentRoom: targetRoom, logs, input, items },
      currentUser,
    } = this.props;

    if (false) {
      return (
        <div styleName="chatroom-container">
          <div
            styleName="header-bar"
            onClick={this.onRoomToggle}
            role="button"
            tabIndex="-1"
          >
            聊天室{renderMinus()}
          </div>
          <div className={cx('body', 'no-data')}>沒有聊天記錄</div>
        </div>
      );
    }
    return (
      <div styleName="chatroom-container">
        <div
          styleName="header-bar"
          onClick={this.onRoomToggle}
          role="button"
          tabIndex="-1"
        >
          聊天室{renderMinus()}
        </div>
        <div>
          <div className={cx('header', 'left')}>
            <SearchInput />
          </div>
          <div className={cx('header', 'right')}>
            {targetRoom.name}
            <IconDetail size={20} color="#999" styleName="detail" />
          </div>
        </div>
        <div className={cx('body')}>
          <div styleName="user-list">
            <UserList
              chatRooms={chatRooms}
              fetchRooms={dispatchFetchChatRoom}
              currentUser={targetRoom}
              onUserSelect={dispatchChangeChatTarget}
            />
          </div>
          <div styleName="chat-box">
            <div styleName="message-box">
              <MessageBox
                ref={messageBox => (this.messageBox = messageBox)}
                logs={logs}
                currentUser={currentUser}
                targetRoom={targetRoom}
                sendRead={dispatchSendXmppRead}
              />
            </div>
            <div styleName="input-box">
              <InputBox
                input={input}
                changeInput={dispatchChangeInput}
                uploadPhoto={this.onPhotoSend}
                sendMessage={this.onMessageSend}
                selectItem={this.onItemSelect}
                items={items}
                targetRoom={targetRoom}
                fetchMyItems={dispatchFetchMyItems}
                fetchTargetItems={dispatchFetchTargetItems}
              />
            </div>
          </div>
        </div>
      </div>
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
