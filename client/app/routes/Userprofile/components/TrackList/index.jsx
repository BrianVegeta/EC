import React from 'react';
// import myPropTypes from 'propTypes';
import PropTypes from 'prop-types';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import { TRACK_ME, ME_TRACK } from '../../modules/userprofileTrack';
import TrackCard from '../TrackCard';

class TrackList extends React.Component {

  static propTypes = {
    records: PropTypes.arrayOf(
      PropTypes.object.isRequired,
    ).isRequired,
    type: PropTypes.oneOf([TRACK_ME, ME_TRACK]).isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  render() {
    const { records, type, onRemove } = this.props;
    return (
      <div styleName="container">
        <div className="clear">
          {records.map((person, index) => (
            <div
              key={`${index + 1}`}
              styleName="track-card-wrapper"
            >
              <TrackCard
                type={type}
                name={person.name}
                picture={person.img}
                uid={person.uid}
                onRemove={onRemove}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CSS(TrackList, styles);
