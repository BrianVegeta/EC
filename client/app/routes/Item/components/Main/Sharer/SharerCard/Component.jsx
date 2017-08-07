import React, { PropTypes } from 'react';
import FollowButton from 'components/Button/Follow';

import { formatDate } from 'lib/time';

const FAKER_IAMGE = 'http://r.fod4.com/c=sq/s=w1000,pd1/o=80/http://p.fod4.com/p/channels/qpztk/profile/ToJNnsiRhmm405cz7CPX_charlize-theron-head-shot.jpg';
const propTypes = { 
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  owner_credit: PropTypes.number.isRequired,
  create_time: PropTypes.number.isRequired,
  target_uid: PropTypes.string.isRequired,
  is_follow: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  };
const SharerCard = props => (
  <div styleName="container">
    <div styleName="avatar" style={{ backgroundImage: `url(${FAKER_IAMGE})` }} />
    <div styleName="details">
      <div styleName="name">
        <span>{props.name}</span>
        <FollowButton target_uid={props.target_uid} isActive={props.is_follow} dispatch={props.dispatch}/>
      </div>
      <div styleName="sub-header">
        {`${props.city}${props.area}`}，於{formatDate(props.create_time)}加入
      </div>
      <div styleName="marks">
        <div styleName="rating">
          {[1, 2, 3, 4, 5].map(() =>
            <span className="fa fa-star" styleName="star" />,
          )}
          <span styleName="star-text">{props.owner_credit.toFixed(1)}</span>
        </div>

      </div>
    </div>
  </div>
);

SharerCard.propTypes = propTypes;
export default SharerCard;
