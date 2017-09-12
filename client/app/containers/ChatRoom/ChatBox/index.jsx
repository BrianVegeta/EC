import React from 'react';
import PropTypes from 'prop-types';
import IconMinus from 'react-icons/lib/ti/minus';
import IconDetail from 'react-icons/lib/md/description';
import IconChat from 'components/Icons/Chat';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import UserList from '../UserList';
import MessageBox from '../MessageBox';
import InputBox from '../InputBox';
import SearchInput from '../SearchInput';


const cx = classnames.bind(styles);
class ChatBox extends React.Component {

  static propTypes = {
    dispatchResetBox: PropTypes.func.isRequired,
    dispatchSendMessage: PropTypes.func.isRequired,
    dispatchUploadPhoto: PropTypes.func.isRequired,
    dispatchSelectItem: PropTypes.func.isRequired,
    dispatchFetchChatRoom: PropTypes.func.isRequired,
    dispatchChangeChatTarget: PropTypes.func.isRequired,
    dispatchChangeInput: PropTypes.func.isRequired,
    dispatchFetchMyItems: PropTypes.func.isRequired,
    dispatchFetchTargetItems: PropTypes.func.isRequired,
    dispatchSendXmppRead: PropTypes.func.isRequired,
    chatBox: PropTypes.shape({
      currentRoom: PropTypes.object,
      logs: PropTypes.array,
      input: PropTypes.string,
      items: PropTypes.object,
    }).isRequired,
    chatRooms: PropTypes.shape({
      rooms: PropTypes.array.isRequired,
    }).isRequired,
    currentUser: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired,
    closeBox: PropTypes.func.isRequired,
  };

  static renderMinus() {
    return <IconMinus size={20} className={cx('minus')} />;
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.onMessageSend = this.onMessageSend.bind(this);
    this.onPhotoSend = this.onPhotoSend.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
  }

  componentDidMount() {
    const {
      dispatchChangeChatTarget,
      chatRooms: { rooms },
    } = this.props;
    if (rooms.length > 0) {
      const [room] = rooms;
      const { members: [user] } = room;
      dispatchChangeChatTarget(room, user);
    }
  }

  componentDidUpdate({ chatBox }) {
    if (chatBox.logs.length !== this.props.chatBox.logs.length) {
      if (this.messageBox) {
        this.messageBox.scrollBottom();
      }
    }
    const {
      dispatchChangeChatTarget,
      chatRooms: { rooms },
      chatBox: { currentRoom },
    } = this.props;
    if (rooms.length > 0 && !currentRoom) {
      const [room] = rooms;
      const { members: [user] } = room;
      dispatchChangeChatTarget(room, user);
    }
  }

  componentWillUnmount() {
    this.props.dispatchResetBox();
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

  render() {
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
      closeBox,
    } = this.props;

    if (chatRooms.rooms.length === 0) {
      return (
        <div styleName="chatroom-container">
          <div
            styleName="header-bar"
            onClick={closeBox}
            role="button"
            tabIndex="-1"
          >
            聊天室{renderMinus()}
          </div>
          <div className={cx('body', 'no-data')}>
            <IconChat color="#B3B4B4" background="#f1f1f1" />
            <div>目前還沒有聊天記錄喔！</div>
          </div>
        </div>
      );
    }

    if (!targetRoom) {
      return null;
    }

    return (
      <div styleName="chatroom-container">
        <div
          styleName="header-bar"
          onClick={closeBox}
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
              changeChatTarget={dispatchChangeChatTarget}
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
}

export default CSS(ChatBox, styles);
