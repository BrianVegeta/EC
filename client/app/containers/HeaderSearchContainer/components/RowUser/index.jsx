import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { userprofilePaths } from 'lib/paths'
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Avatar from '../../../../components/Avatar';


class UserRow extends React.Component {

  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      addresses: PropTypes.string,
      avatarBg: PropTypes.string,
      uid: PropTypes.string,
    }).isRequired,
  }
  render() {
    const { user } = this.props;
    const { username, addresses, avatarBg, uid } = user;
    return (
      <div styleName="container">
        <Link to={userprofilePaths.indexPath(uid)}>
          <div styleName="avatar">
            <Avatar src={avatarBg} width={56} />
          </div>
          <div styleName="body">
            <div styleName="name">{username}</div>
            <div styleName="address">{addresses}</div>
          </div>
        </Link>
      </div>
    );
  }
}

export default CSS(UserRow, styles);
