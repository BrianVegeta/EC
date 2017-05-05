import React, { PropTypes } from 'react';

const defaultProps = {
  helperText: null,
};
const propTypes = {
  text: PropTypes.string.isRequired,
  helperText: PropTypes.string,
};
const Title = props => (
  <div styleName="container">
    <h2 styleName="title">{props.text}</h2>
    {props.helperText && <span styleName="helper">{props.helperText}</span>}
  </div>
);
Title.defaultProps = defaultProps;
Title.propTypes = propTypes;
export default Title;
