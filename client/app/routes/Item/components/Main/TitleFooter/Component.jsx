import React, { PropTypes } from 'react';
import Location from 'react-icons/lib/md/location-on';
import LocalOffer from 'react-icons/lib/md/local-offer';

const propTypes = {
  location: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
const TitleFooter = props => (
  <div styleName="container">
    <div styleName="location">
      <Location size={17} styleName="icon" />
      <div styleName="text">{props.location}</div>
    </div>
    <div styleName="category">
      <LocalOffer size={17} styleName="icon" />
      <div styleName="text">{props.category}</div>
    </div>
  </div>
);
TitleFooter.propTypes = propTypes;
export default TitleFooter;
