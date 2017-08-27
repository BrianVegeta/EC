import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';

import IconPhone from 'react-icons/lib/md/phone-iphone';
import IconLock from 'react-icons/lib/md/lock-outline';
import IconMail from 'react-icons/lib/md/mail-outline';
import IconVerified from 'react-icons/lib/md/verified-user';

import hasError from 'components/Input/hoc/hasError';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

export const ICON_TYPE_PHONE = 'ICON_TYPE_PHONE';
export const ICON_TYPE_EMAIL = 'ICON_TYPE_EMAIL';
export const ICON_TYPE_PASSWORD = 'ICON_TYPE_PASSWORD';
export const ICON_TYPE_VERIFICATION = 'ICON_TYPE_VERIFICATION';

const cx = classnames.bind(styles);
class TextField extends React.Component {

  static defaultProps = {
    icon: null,
    suffix: null,
    suffixWidth: 0,
    placeholder: null,
    type: 'text',
    errorMessage: null,
    value: '',
    onChange: null,
  };

  static propTypes = {
    icon: PropTypes.oneOfType([
      PropTypes.func.isRequired,
      PropTypes.oneOf([
        ICON_TYPE_PHONE,
        ICON_TYPE_EMAIL,
        ICON_TYPE_PASSWORD,
        ICON_TYPE_VERIFICATION,
      ]).isRequired,
    ]),
    suffix: PropTypes.node,
    suffixWidth: PropTypes.number,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    errorMessage: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  static chooseIcon(icon) {
    switch (icon) {
      case ICON_TYPE_PHONE: return <IconPhone />;
      case ICON_TYPE_EMAIL: return <IconMail />;
      case ICON_TYPE_PASSWORD: return <IconLock />;
      case ICON_TYPE_VERIFICATION: return <IconVerified />;
      default: return null;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isFocusing: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { onChange } = this.props;
    if (onChange === null) return;
    onChange(e.target.value);
  }

  renderIcon() {
    const { icon } = this.props;
    if (!icon) return null;
    const { isFocusing } = this.state;
    const { chooseIcon } = this.constructor;
    return (
      <div className={cx('icon', { focusing: isFocusing })}>
        {isFunction(icon) ? icon() : chooseIcon(icon)}
      </div>
    );
  }

  renderSuffix() {
    const { suffix } = this.props;
    if (!suffix) return null;
    return <div styleName="suffix">{suffix}</div>;
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) return null;
    return <div styleName="error-message">{errorMessage}</div>;
  }

  renderInput() {
    const {
      placeholder,
      type,
      value,
      suffix,
      suffixWidth,
    } = this.props;
    return (
      <input
        styleName="input"
        type={type}
        value={value}
        spellCheck={false}
        placeholder={placeholder}
        style={{ marginRight: suffix ? suffixWidth : null }}
        onFocus={() => this.setState({ isFocusing: true })}
        onBlur={() => this.setState({ isFocusing: false })}
        onChange={this.onChange}
      />
    );
  }

  render() {
    const { icon } = this.props;
    const { isFocusing } = this.state;
    return (
      <div styleName="input-control">
        {this.renderErrorMessage()}
        <div styleName="input-group">
          <div styleName="input-group-inner">
            <div className={cx('input-container', { 'with-icon': !!icon })}>
              {this.renderInput()}
            </div>
            {this.renderIcon()}
            {this.renderSuffix()}
          </div>
        </div>
        <div className={cx('bottomLine', { focusing: isFocusing })} />
      </div>
    );
  }
}

const errorDefaultProps = {
  validateOnBlur: false,
  errorType: 'inline',
};
export default hasError(CSS(TextField, styles), errorDefaultProps);
