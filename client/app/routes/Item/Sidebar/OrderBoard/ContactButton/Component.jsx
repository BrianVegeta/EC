import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AVATART_SRC = 'http://r.fod4.com/c=sq/s=w1000,pd1/o=80/http://p.fod4.com/p/channels/qpztk/profile/ToJNnsiRhmm405cz7CPX_charlize-theron-head-shot.jpg';
class ContactButton extends React.Component {
  render() {
    return (
      <Link to="/">
        <button styleName="container-btn">
          <div styleName="avatar-cell">
            <div styleName="avatar">
              <img alt="" src={AVATART_SRC} />
            </div>
          </div>
          <div styleName="text-cell">
            <span>聯繫分享人</span>
          </div>
        </button>
      </Link>
    );
  }
}

export default ContactButton;
