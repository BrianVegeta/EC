import React from 'react';
import PropTypes from 'prop-types';

import hasError from 'components/Input/hoc/hasError';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class InputCurrency extends React.Component {

  static defaultProps = {
    unit: '#',
    placeholder: null,
    value: '',
    width: null,
    onChange: null,
    onBlur: null,
  };

  static propTypes = {
    unit: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = { isFocusing: false };
  }

  onBlur() {
    const { onBlur } = this.props;
    if (onBlur) { onBlur(); }
    this.setState({ isFocusing: false });
  }

  onFocus() {
    this.setState({ isFocusing: true });
  }

  onChange(e) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e.target.value);
    }
  }

  render() {
    const { unit, placeholder, value, width } = this.props;
    const { isFocusing } = this.state;

    return (
      <div
        className={cx('input-outer', { focusing: isFocusing })}
        style={{ width }}
      >
        <span className={cx('unit')}>{unit}</span>
        <input
          className={cx('input')}
          placeholder={placeholder}
          value={value}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default hasError(CSS(InputCurrency, styles));
