import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'components/Avatar';
import FormButton from 'components/FormButton';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class OwnerInfoNote extends React.Component {

  static propTypes = {
    avatarSrc: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    dispatchChat: PropTypes.func.isRequired,
  };

  render() {
    const {
      avatarSrc,
      userId,
      username,
      dispatchChat,
    } = this.props;

    return (
      <div styleName="container">
        <div styleName="avatar">
          <Avatar src={avatarSrc} />
        </div>
        <div styleName="profile-info">
          <div styleName="username">
            分享人：{username}
          </div>
          <div styleName="user-id-container">
            <div styleName="user-id">ID：{userId}</div>
            <FormButton
              colorType="greenBorder"
              content="私訊"
              width="auto"
              style={{ padding: '6px 20px' }}
              onClick={dispatchChat}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(OwnerInfoNote, styles);
