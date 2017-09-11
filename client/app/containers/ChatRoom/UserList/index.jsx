/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
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
      rooms: PropTypes.array.isRequired,
      isPaginable: PropTypes.bool.isRequired,
      isFetching: PropTypes.bool.isRequired,
    }).isRequired,
    fetchRooms: PropTypes.func.isRequired,
    onUserSelect: PropTypes.func.isRequired,
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

  constructor(props) {
    super(props);
    this.renderUser = this.renderUser.bind(this);
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

  renderUser(room, i) {
    const {
      last_message,
      unread_message_count,
      last_message_create_time,
      members: [user],
    } = room;
    const { uid, name, picture } = user;
    const {
      onUserSelect, currentUser: { uid: currentUserId },
    } = this.props;
    const { renderUnreadCount, renderLastCreateTime } = this.constructor;
    return (
      <div
        key={`${i + 1}`}
        styleName="user-container"
        className={cx('user-container', { selecting: uid === currentUserId })}
        role="button"
        tabIndex="-1"
        onClick={() => onUserSelect(room, user)}
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

  render() {
    const {
      chatRooms: {
        rooms,
        isPaginable,
        isFetching,
      },
      fetchRooms,
    } = this.props;
    return (
      <div styleName="container">
        <Infinite
          elementHeight={51}
          containerHeight={420}
          infiniteLoadBeginEdgeOffset={500}
          onInfiniteLoad={isPaginable ? fetchRooms : () => console.log('enough')}
          loadingSpinnerDelegate={isFetching && <div>loading</div>}
          isInfiniteLoading={isFetching}
        >
          {rooms.map(this.renderUser)}
        </Infinite>
      </div>
    );
  }
}

export default CSS(UserList, styles);
