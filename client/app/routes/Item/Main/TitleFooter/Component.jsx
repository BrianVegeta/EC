import React, { PropTypes } from 'react';

const propTypes = {
  location: PropTypes.string.isRequired
};
const TitleFooter = props => (
  <div styleName="container">
    <div styleName="location">
      <span styleName="icon" />
      <div styleName="text">{props.location}</div>
    </div>
  </div>
);
TitleFooter.propTypes = propTypes;
export default TitleFooter;
