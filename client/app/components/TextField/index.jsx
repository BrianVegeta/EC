import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import bindingErrors from '../../hoc/bindingErrors';

const cx = classnames.bind(styles);
class TextField extends React.Component {
  static defaultProps = {
    icon: null,
    suffix: null,
    suffixWidth: 0,
    placeholder: null,
    type: 'text',
    errorMessage: null,
  };
  static propTypes = {
    icon: PropTypes.func,
    suffix: PropTypes.node,
    suffixWidth: PropTypes.number,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    errorMessage: PropTypes.string,
    resource: PropTypes.object.isRequired,
    // onChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      isFocusing: false,
    };
  }
  onChange(e) {
    this.props.resource.update(e.target.value);
  }
  render() {
    const {
      icon,
      placeholder,
      suffix,
      suffixWidth,
      type,
      errorMessage,
    } = this.props;
    const { isFocusing } = this.state;
    const { resource } = this.props;
    return (
      <div styleName="inputControl">
        { errorMessage && <div styleName="error">{errorMessage}</div> }
        <div styleName="inputGroup">
          <div styleName="inputGroupInner">
            <div className={cx('inputOuter', { withIcon: !!icon })}>
              <input
                styleName="input"
                type={type}
                value={resource.value}
                spellCheck={false}
                placeholder={placeholder}
                style={{ marginRight: suffix ? suffixWidth : null }}
                onFocus={() => this.setState({ isFocusing: true })}
                onBlur={() => this.setState({ isFocusing: false })}
                onChange={this.onChange}
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

export default bindingErrors(CSS(TextField, styles));
