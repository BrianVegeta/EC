import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);

class FormGroup extends React.Component {

  static defaultProps = {
    topLine: false,
    large: false,
    limiter: null,

    headerText: null,
    helperText: null,
    helperBottomText: null,
    helperBottom: null,

    optional: false,
    multiple: false,
    groupStyle: {},
    headerTextStyle: {},
  };

  static propTypes = {
    topLine: PropTypes.bool,
    large: PropTypes.bool,
    limiter: PropTypes.node,

    headerText: PropTypes.string,
    helperText: PropTypes.string,
    helperBottomText: PropTypes.string,
    helperBottom: PropTypes.node,

    optional: PropTypes.bool,
    multiple: PropTypes.bool,
    children: PropTypes.node.isRequired,
    groupStyle: PropTypes.object,
    headerTextStyle: PropTypes.object,
  };

  static renderHeader({
    headerTextStyle, headerText, optional, multiple, limiter,
  }) {
    return (
      <div style={headerTextStyle}>
        {headerText}
        {optional && <span styleName="optional">（非必填）</span>}
        {multiple && <span styleName="multiple">（可複選）</span>}
        {limiter && <span styleName="input-limiter">{limiter}</span>}
      </div>
    );
  }

  render() {
    const {
      topLine,
      large,

      headerText,
      helperText,
      helperBottomText,
      helperBottom,

      children,
      groupStyle,
    } = this.props;

    const { headerTextStyle, optional, multiple, limiter } = this.props;
    const headerProps = { headerTextStyle, headerText, optional, multiple, limiter };

    return (
      <div styleName="container" style={groupStyle}>
        {topLine && <div styleName="interval-line" />}
        <div className={cx('input-header', { 'input-header-large': large })}>
          {headerText && this.constructor.renderHeader(headerProps)}
          {helperText && <div styleName="helper">{helperText}</div>}
        </div>
        <div styleName="input-control">{children}</div>
        {helperBottom && <div styleName="helper-bottom">{helperBottom}</div>}
        {helperBottomText && <div styleName="helper-bottom">{helperBottomText}</div>}
      </div>
    );
  }
}

export default CSS(FormGroup, styles);
