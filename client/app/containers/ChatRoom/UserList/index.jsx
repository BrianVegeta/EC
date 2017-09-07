import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import Infinite from 'react-infinite';
import Avatar from 'components/Avatar';
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

  renderUser({ members: [{ uid, name, picture }] }, i) {
    const {
      onUserSelect, currentUser: { uid: currentUserId },
    } = this.props;
    return (
      <div
        key={`${i + 1}`}
        styleName="user-container"
        className={cx('user-container', { selecting: uid === currentUserId })}
        role="button"
        tabIndex="-1"
        onClick={() => onUserSelect({ uid })}
      >
        <div styleName="avatar">
          <Avatar src={picture} />
        </div>
        <span styleName="name">{name}</span>
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
          containerHeight={450}
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
