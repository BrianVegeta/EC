import React, { PropTypes } from 'react';

const defaultProps = {
  helperText: null,
  optional: false,
};
const propTypes = {
  headerText: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  optional: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
const InputField = props => (
  <div styleName="inputGroup">
    <div styleName="inputHeader">
      <div>
        {props.headerText}
        {props.optional && <span styleName="optional">（選填）</span>}
      </div>
      {props.helperText && <div styleName="helper">{props.helperText}</div>}
    </div>
    <div styleName="inputControl">{props.children}</div>
  </div>
);
InputField.defaultProps = defaultProps;
InputField.propTypes = propTypes;
export default InputField;
