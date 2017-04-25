import React, { PropTypes } from 'react';

const propTypes = {
  avatarSrc: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
const ContactRequester = props => (
  <div styleName="container">
    <div styleName="user">
      <div
        styleName="avatar"
        style={{ backgroundImage: `url(${props.avatarSrc})` }}
      />
      <div styleName="username">{props.username}</div>
    </div>
    <button className="default-button" styleName="contact">
      <span styleName="icon" />
    </button>
  </div>
);
ContactRequester.propTypes = propTypes;
export default ContactRequester;
