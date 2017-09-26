/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { isEqual, filter } from 'lodash';
import Infinite from 'react-infinite';
import Avatar from 'components/Avatar';
import { formatDate } from 'lib/time';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class UserList extends React.Component {

  static propTypes = {
    chatRooms: PropTypes.shape({
      searchInput: PropTypes.string,
      rooms: PropTypes.array.isRequired,
      isPaginable: PropTypes.bool.isRequired,
      isFetching: PropTypes.bool.isRequired,
    }).isRequired,
    fetchRooms: PropTypes.func.isRequired,
    changeChatTarget: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired,
  };

  static renderUnreadCount(count) {
    if (count <= 0) return null;
    return <div styleName="unread">{count > 99 ? `${99}+` : count}</div>;
  }

  static renderLastCreateTime(time) {
    return formatDate(time);
  }

  static getRooms({ searchInput, rooms }) {
    if (searchInput) {
      const results = filter(rooms, (room) => {
        const { members: [user] } = room;
        return user.name.indexOf(searchInput) !== -1;
      });
      return results;
    }
    return rooms;
  }

  constructor(props) {
    super(props);
    this.renderUser = this.renderUser.bind(this);
    this.onInfiniteLoad = this.onInfiniteLoad.bind(this);
  }

  shouldComponentUpdate({ currentUser, chatRooms }) {
    if (
      isEqual(currentUser, this.props.currentUser) &&
      isEqual(chatRooms, this.props.chatRooms)
    ) {
      return false;
    }
    return true;
  }

  onInfiniteLoad() {
    const {
      chatRooms: { isPaginable },
      fetchRooms,
    } = this.props;
    if (isPaginable) {
      fetchRooms();
    }
  }

  renderUser(room, i) {
    const {
      last_message,
      unread_message_count,
      last_message_create_time,
      members: [user],
    } = room;
    const { uid, name, picture } = user;
    const { changeChatTarget, currentUser } = this.props;
    const { renderUnreadCount, renderLastCreateTime } = this.constructor;
    const selecting = uid.toLowerCase() === currentUser.uid.toLowerCase();
    return (
      <div
        key={`${i + 1}`}
        styleName="user-container"
        className={cx('user-container', { selecting })}
        role="button"
        tabIndex="-1"
        onClick={() => changeChatTarget(room, user)}
      >
        <div styleName="avatar">
          <Avatar src={picture} />
        </div>
        <div styleName="content">
          <div styleName="header">
            <div styleName="name">{name}</div>
            <span styleName="time">
              {renderLastCreateTime(last_message_create_time)}
            </span>
          </div>
          <div styleName="footer">
            <div styleName="message">{last_message}</div>
            {renderUnreadCount(unread_message_count)}
          </div>
        </div>
      </div>
    );
  }

  renderNoRoom() {
    const { chatRooms: { searchInput } } = this.props;
    if (searchInput) return <div styleName="search-no-result">搜尋沒有結果</div>;
    return null;
  }

  render() {
    const { chatRooms } = this.props;
    const { isFetching } = chatRooms;
    const { getRooms } = this.constructor;
    return (
      <div styleName="container">
        <Infinite
          elementHeight={51}
          containerHeight={420}
          infiniteLoadBeginEdgeOffset={500}
          onInfiniteLoad={this.onInfiniteLoad}
          loadingSpinnerDelegate={isFetching && <div>loading</div>}
          isInfiniteLoading={isFetching}
        >
          {
            getRooms(chatRooms).length > 0 ?
              getRooms(chatRooms).map(this.renderUser) :
              this.renderNoRoom()
          }
        </Infinite>
      </div>
    );
  }
}

export default CSS(UserList, styles);
