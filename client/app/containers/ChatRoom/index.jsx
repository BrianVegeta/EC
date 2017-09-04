import React from 'react';
import PropTypes from 'prop-types';
import IconMinus from 'react-icons/lib/ti/minus';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import UserList from './UserList';


const cx = classnames.bind(styles);
class ChatRoom extends React.Component {

  static propTypes = {
    dispatchFetchChatRoom: PropTypes.func.isRequired,

    chat: PropTypes.shape({
      rooms: PropTypes.array.isRequired,
    }).isRequired,
  };

  static renderMinus(onClick) {
    return (
      <IconMinus
        size={20}
        className={cx('minus')}
        onClick={onClick}
      />
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.onRoomToggle = this.onRoomToggle.bind(this);
  }

  componentDidMount() {
    console.log('mount');
    this.props.dispatchFetchChatRoom();
  }

  componentWillUnmount() {
    console.log('unmount');
  }

  onRoomToggle() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  renderTalkButton() {
    return (
      <div
        styleName="talk-button"
        role="button"
        tabIndex="-1"
        onClick={this.onRoomToggle}
      >
        聊聊
      </div>
    );
  }

  renderChatRomm() {
    const {
      renderMinus,
    } = this.constructor;
    const {
      chat: { rooms },
    } = this.props;

    if (false) {
      return (
        <div styleName="chatroom-container">
          <div styleName="header">
            目前還沒任何訊息{renderMinus(this.onRoomToggle)}
          </div>
          <div className={cx('body', 'no-data')}>沒有聊天記錄</div>
        </div>
      );
    }
    return (
      <div styleName="chatroom-container">
        <div>
          <div className={cx('header', 'left')}>&nbsp;</div>
          <div className={cx('header', 'right')}>
            phyala{renderMinus(this.onRoomToggle)}
          </div>
        </div>
        <div className={cx('body')}>
          <div styleName="user-list">
            <UserList rooms={rooms} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { isOpen } = this.state;
    return (
      <div styleName="container">
        {isOpen ? this.renderChatRomm() : this.renderTalkButton()}
      </div>
    );
  }
}

export default CSS(ChatRoom, styles);
