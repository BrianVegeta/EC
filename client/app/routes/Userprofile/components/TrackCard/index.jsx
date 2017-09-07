import React from 'react';
import PropTypes from 'prop-types';
// import FollowButton from 'components/Button/Follow';
import CSS from 'react-css-modules';
import Close from 'react-icons/lib/md/close';
import { Link } from 'react-router';
import { userprofilePaths } from 'lib/paths';
import Avatar from 'components/Avatar';
import styles from './styles.sass';
import { TRACK_ME, ME_TRACK } from '../../modules/userprofileTrack';

const propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  type: PropTypes.oneOf([TRACK_ME, ME_TRACK]).isRequired,
};
const TrackCard = props => (
  <div styleName="container">
    { (props.type === ME_TRACK) &&
      <button
        className="button"
        styleName="close"
        onClick={() => console.log('touch')}
      >
        <Close size={20} />
      </button>
    }
    <Link
      to={userprofilePaths.indexPath(props.uid)}
      styleName="image"
    >
      <Avatar src={props.picture} width={52} height={52} />
    </Link>
    <Link
      to={userprofilePaths.indexPath(props.uid)}
      styleName="details"
    >
      <div styleName="name">{props.name}</div>
      <div styleName="uid">{props.uid}</div>
    </Link>
    <div styleName="action">
      <button styleName="button" className="button">
         私訊
      </button>
    </div>
  </div>
);

TrackCard.propTypes = propTypes;
export default CSS(TrackCard, styles);
