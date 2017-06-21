import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Avatar from '../../../Avatar';


class UserRow extends React.Component {
  render() {
    const { user } = this.props;
    const { username, addresses, avatarBg } = user;
    return (
      <div styleName="container">
        <div styleName="avatar">
          <Avatar src={avatarBg} width={56} />
        </div>
        <div styleName="body">
          <div styleName="name">{username}</div>
          <div styleName="address">{addresses}</div>
        </div>
      </div>
    );
  }
}

export default CSS(UserRow, styles);
