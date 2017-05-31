import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const defaultProps = {
  helperText: null,
  optional: false,
};
const propTypes = {
  children: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  optional: PropTypes.bool,
};
const Title = props => (
  <div styleName="container">
    <h2 styleName="title">
      {props.children}
      {props.optional && <span styleName="titleHelper">（非必填）</span>}
    </h2>
    {props.helperText && <span styleName="helper">{props.helperText}</span>}
  </div>
);
Title.defaultProps = defaultProps;
Title.propTypes = propTypes;
export default CSS(Title, styles);
