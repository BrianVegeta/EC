import React, { PropTypes } from 'react';

const propTypes = {
  location: PropTypes.string.isRequired,
  orderedCount: PropTypes.number.isRequired,
};
const TitleFooter = props => (
  <div styleName="container">
    <div styleName="location">
      <span styleName="icon" />
      <div styleName="text">{props.location}</div>
    </div>
    <div styleName="ordered">
      <span styleName="icon" />
      <div styleName="text">{props.orderedCount}人下單過</div>
    </div>
  </div>
);
TitleFooter.propTypes = propTypes;
export default TitleFooter;
