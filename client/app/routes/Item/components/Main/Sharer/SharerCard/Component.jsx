import React from 'react';
import PropTypes from 'prop-types';
// import FollowButton from 'components/Button/Follow';

import Avatar from 'components/Avatar';
import Stars from 'components/Stars';

// const FAKER_IAMGE = 'http://r.fod4.com/c=sq/s=w1000,pd1/o=80/http://p.fod4.com/p/channels/qpztk/profile/ToJNnsiRhmm405cz7CPX_charlize-theron-head-shot.jpg';
const propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  // city: PropTypes.string.isRequired,
  // area: PropTypes.string.isRequired,
  owner_credit: PropTypes.number.isRequired,
  // create_time: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
  // is_follow: PropTypes.bool.isRequired,
  // dispatch: PropTypes.func.isRequired,
};
const SharerCard = props => (
  <div styleName="container">
    <div styleName="image" className="clear">
      <Avatar src={props.picture} width={101} height={101} />
    </div>
    <div styleName="details" className="clear">
      <div styleName="name">
        {props.name}
      </div>
      <div styleName="marks">
        <div styleName="star-text">{props.owner_credit.toFixed(1)}</div>
        <div styleName="score">
          <div styleName="sub-header">{props.uid}</div>
          <Stars
            size={20}
            activeColor="#FF9442"
            score={props.owner_credit}
          />
        </div>
      </div>
    </div>
  </div>
);

SharerCard.propTypes = propTypes;
export default SharerCard;
