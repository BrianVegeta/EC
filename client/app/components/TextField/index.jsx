import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class TextField extends React.Component {
  static defaultProps = {
    icon: null,
    suffix: null,
    placeholder: null,
    type: 'text',
    suffixWidth: 0,
  };
  static propTypes = {
    icon: PropTypes.func,
    suffix: PropTypes.node,
    suffixWidth: PropTypes.number,
    placeholder: PropTypes.string,
    type: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      isFocusing: false,
    };
  }
  render() {
    const { icon, placeholder, suffix, suffixWidth, type } = this.props;
    const { isFocusing } = this.state;
    return (
      <div styleName="inputControl">
        <div styleName="inputGroup">
          <div styleName="inputGroupInner">
            <div className={cx('inputOuter', { withIcon: !!icon })}>
              <input
                styleName="input"
                type={type}
                placeholder={placeholder}
                style={{ marginRight: suffix ? suffixWidth : null }}
                onFocus={() => this.setState({ isFocusing: true })}
                onBlur={() => this.setState({ isFocusing: false })}
              />
            </div>
            {icon && <div className={cx('icon', { focusing: isFocusing })}>{icon()}</div>}
            {suffix && <div styleName="suffix">{suffix}</div>}
          </div>
        </div>
        <div className={cx('bottomLine', { focusing: isFocusing })} />
      </div>
    );
  }
}

export default CSS(TextField, styles);
