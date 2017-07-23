import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import IconPhone from 'react-icons/lib/md/phone-iphone';
import IconLock from 'react-icons/lib/md/lock-outline';
import IconMail from 'react-icons/lib/md/mail-outline';

import bindingErrors from 'components/Input/hoc/hasError';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

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
      PropTypes.func,
      PropTypes.oneOf(['phone', 'email', 'password']),
    ]),
    suffix: PropTypes.node,
    suffixWidth: PropTypes.number,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    errorMessage: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

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

  switchIcon() {
    const { icon } = this.props;
    switch (icon) {
      case 'phone':
        return <IconPhone />;

      case 'email':
        return <IconMail />;

      case 'password':
        return <IconLock />;

      default:
        return null;
    }
  }

  renderIcon() {
    const { icon } = this.props;
    if (_.isString(icon)) {
      return this.switchIcon();
    }

    return icon();
  }

  render() {
    const {
      icon,
      placeholder,
      suffix,
      suffixWidth,
      type,
      value,
      errorMessage,
    } = this.props;
    const { isFocusing } = this.state;

    return (
      <div styleName="inputControl">
        { errorMessage && <div styleName="error">{errorMessage}</div> }
        <div styleName="inputGroup">
          <div styleName="inputGroupInner">
            <div className={cx('inputOuter', { withIcon: !!icon })}>
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
            </div>
            {this.props.icon &&
              <div className={cx('icon', { focusing: isFocusing })}>
                {this.renderIcon()}
              </div>
            }
            {suffix &&
              <div styleName="suffix">
                {suffix}
              </div>
            }
          </div>
        </div>
        <div className={cx('bottomLine', { focusing: isFocusing })} />
      </div>
    );
  }
}

export default bindingErrors(CSS(TextField, styles));
