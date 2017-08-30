import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const propTypes = {
  avatarSrc: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
const Contact = props => (
  <div styleName="container">
    <div styleName="user">
      <div
        styleName="avatar"
        style={{ backgroundImage: `url(${props.avatarSrc})` }}
      />
      <div styleName="username">{props.username}</div>
    </div>
  </div>
);
Contact.propTypes = propTypes;
export default CSS(Contact, styles);
