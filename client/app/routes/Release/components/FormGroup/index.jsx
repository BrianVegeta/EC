import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import IntervalLine from '../IntervalLine';

const cx = classnames.bind(styles);
const defaultProps = {
  helperText: null,
  helperBottomText: null,
  limiter: null,
  optional: false,
  multiple: false,
  large: false,
  groupStyle: {},
  headerTextStyle: {},
  topLine: false,
};
const propTypes = {
  large: PropTypes.bool,
  headerText: PropTypes.string.isRequired,
  limiter: PropTypes.node,
  helperText: PropTypes.string,
  helperBottomText: PropTypes.string,
  optional: PropTypes.bool,
  multiple: PropTypes.bool,
  children: PropTypes.node.isRequired,
  groupStyle: PropTypes.object.isRequired,
  headerTextStyle: PropTypes.object.isRequired,
  topLine: PropTypes.bool,
};
const InputField = props => (
  <div styleName="inputGroup" style={props.groupStyle}>
    { props.topLine && <IntervalLine marginBottom={10} /> }
    <div className={cx('inputHeader', { inputHeaderLarge: props.large })}>
      <div style={props.headerTextStyle}>
        {props.headerText}
        {props.optional && <span styleName="optional">（非必填）</span>}
        {props.multiple && <span styleName="multiple">（可多選）</span>}
        {props.limiter && <span styleName="inputLimiter">{props.limiter}</span>}
      </div>
      {props.helperText && <div styleName="helper">{props.helperText}</div>}
    </div>
    <div styleName="inputControl">{props.children}</div>
    {props.helperBottomText && <div styleName="helperBottom">{props.helperBottomText}</div>}
  </div>
);
InputField.defaultProps = defaultProps;
InputField.propTypes = propTypes;
export default CSS(InputField, styles);
