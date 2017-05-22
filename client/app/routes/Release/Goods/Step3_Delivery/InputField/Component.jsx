import React, { PropTypes } from 'react';

const propTypes = {
  headerText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
const InputField = props => (
  <div styleName="inputGroup">
    <div styleName="inputHeader">{props.headerText}</div>
    <div styleName="inputControl">{props.children}</div>
  </div>
);
InputField.propTypes = propTypes;
export default InputField;
