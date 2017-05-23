import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const defaultProps = {
  helperText: null,
  limiter: null,
  optional: false,
  multiple: false,
  groupStyle: {},
  headerTextStyle: {},
};
const propTypes = {
  headerText: PropTypes.string.isRequired,
  limiter: PropTypes.node,
  helperText: PropTypes.string,
  optional: PropTypes.bool,
  multiple: PropTypes.bool,
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
        {props.multiple && <span styleName="multiple">（多選）</span>}
        <span styleName="inputLimiter">{props.limiter}</span>
      </div>
      {props.helperText && <div styleName="helper">{props.helperText}</div>}
    </div>
    <div styleName="inputControl">{props.children}</div>
  </div>
);
InputField.defaultProps = defaultProps;
InputField.propTypes = propTypes;
export default CSS(InputField, styles);
