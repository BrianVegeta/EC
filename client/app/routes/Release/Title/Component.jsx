import React, { PropTypes } from 'react';

const propTypes = { text: PropTypes.string.isRequired };
const Title = props => (
  <h2 styleName="title">{props.text}</h2>
);
Title.propTypes = propTypes;
export default Title;
