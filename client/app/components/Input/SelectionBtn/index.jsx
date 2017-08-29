import React from 'react';
import PropTypes from 'prop-types';
// import ArrowDownIcon from 'react-icons/lib/md/keyboard-arrow-down';
import IconArrowDown from 'components/Icons/ArrowDown';
import { isEmpty } from 'lodash';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class SelectionButton extends React.Component {

  static defaultProps = {
    maxHeight: null,
    value: null,
    placeholder: null,
    width: '100%',
    dropdownWidth: '100%',
    disabled: false,
    invalid: false,
    onBlur: null,
  };

  static propTypes = {
    children: PropTypes.node.isRequired,

    maxHeight: PropTypes.number,
    value: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number, PropTypes.node,
    ]),
    placeholder: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dropdownWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    onBlur: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onButtonPress = this.onButtonPress.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
    // this.closeDropdown = this.closeDropdown.bind(this);
    this.state = {
      isFocusing: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside, false);
  }

  onButtonPress() {
    const { isFocusing } = this.state;
    if (!isFocusing) {
      this.openDropdown();
    }
  }

  onClickOutside(e) {
    if (!this.state.isFocusing) {
      return;
    }
    if (!this.btnContainer) return;
    if (this.btnContainer.contains(e.target)) {
      return;
    }
    if (this.dropdown && this.dropdown.contains(e.target)) {
      return;
    }
    this.props.onBlur();
    this.closeDropdown();
  }

  closeDropdown() {
    this.setState({ isFocusing: false });
  }

  openDropdown() {
    this.setState({ isFocusing: true });
  }

  render() {
    const { isFocusing } = this.state;
    const {
      value,
      placeholder,
      children,
      width,
      maxHeight,
      dropdownWidth,
      disabled,
      invalid,
    } = this.props;

    const dropdownStyle = {
      width: dropdownWidth,
      maxHeight,
      overflowY: 'auto',
    };

    return (
      <div
        ref={btnContainer => (this.btnContainer = btnContainer)}
        styleName="container"
        style={{ width }}
      >
        <button
          ref={btn => (this.button = btn)}
          className={`${cx('input', {
            focusing: isFocusing,
            disabled,
            invalid,
          })} button`}
          onClick={this.onButtonPress}
          disabled={disabled}
        >
          <div className={cx('inner-wrapper', { dropdowning: isFocusing })}>
            <IconArrowDown viewBox="-2 -6 20 20" size={24} />
            <div styleName="inner-text">
              {isEmpty(value) ?
                <span styleName="placeholder">{placeholder}</span> :
                value
              }
            </div>
          </div>
        </button>
        {isFocusing &&
          <div
            ref={dropdown => (this.dropdown = dropdown)}
            styleName="dropdown"
            style={dropdownStyle}
          >
            {children}
          </div>
        }
      </div>
    );
  }
}
export default CSS(SelectionButton, styles);
