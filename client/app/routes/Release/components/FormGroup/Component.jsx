import React, { PropTypes } from 'react';

const defaultProps = {
  helperText: null,
  optional: false,
  groupStyle: {},
  headerTextStyle: {},
};
const propTypes = {
  headerText: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  optional: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  groupStyle: PropTypes.object.isRequired,
  headerTextStyle: PropTypes.object.isRequired,
};
const InputField = props => (
  <div styleName="inputGroup" style={props.groupStyle}>
    <div styleName="inputHeader">
      <div style={props.headerTextStyle}>
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
