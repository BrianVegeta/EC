import React from 'react';
import PropTypes from 'prop-types';
import ArrowDownIcon from 'react-icons/lib/md/keyboard-arrow-down';
import _ from 'lodash';
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
    value: PropTypes.string,
    placeholder: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dropdownWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    onBlur: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.innerMouseEnter = this.innerMouseEnter.bind(this);
    this.innerMouseOut = this.innerMouseOut.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.state = {
      isFocusing: false,
      isDropdownOpen: false,
      isHoverOnButtonInner: false,
    };
  }
  onBlur() {
    const { onBlur } = this.props;
    if (onBlur) onBlur();
    this.setState({ isFocusing: false, isDropdownOpen: false });
  }
  onFocus() {
    this.setState({ isFocusing: true });
  }

  onButtonPress() {
    const { isDropdownOpen } = this.state;
    this.setState({ isDropdownOpen: !isDropdownOpen });
    // if (isHoverOnButtonInner) this.setState({ isDropdownOpen: !isDropdownOpen });
  }

  innerMouseEnter() {
    this.setState({ isHoverOnButtonInner: true });
  }
  innerMouseOut() {
    this.setState({ isHoverOnButtonInner: false });
  }
  closeDropdown() {
    this.setState({ isDropdownOpen: false });
  }
  renderBtnValue() {
    const { value, placeholder } = this.props;
    if (!_.isEmpty(value)) {
      return value;
    }
    return <span styleName="placeholder">{placeholder}</span>;
  }
  render() {
    const { isFocusing, isDropdownOpen } = this.state;
    const {
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
    if (maxHeight) {
      Object.assign({}, dropdownStyle, {
        maxHeight,
        overflowY: 'auto',
      });
    }

    const arrow = (
      <span styleName="dropdownArrow">
        <ArrowDownIcon size={30} />
      </span>
    );
    return (
      <button
        {...{
          ref: btn => (this.button = btn),
          className: `${cx('input', {
            focusing: isFocusing,
            disabled,
            invalid,
          })} button`,
          onClick: this.onButtonPress,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          style: { width },
          disabled,
        }}
      >
        <div
          {...{
            styleName: 'innerWrapper',
            onMouseOver: this.innerMouseEnter,
            onMouseOut: this.innerMouseOut,
            style: {
              borderBottomLeftRadius: isDropdownOpen ? 0 : null,
              borderBottomRightRadius: isDropdownOpen ? 0 : null,
            },
          }}
        >
          {arrow}
          <div styleName="innerText">{this.renderBtnValue()}</div>
        </div>
        {isDropdownOpen &&
          <div
            styleName="dropdown"
            style={dropdownStyle}
          >
            {children}
          </div>
        }
      </button>
    );
  }
}
export default CSS(SelectionButton, styles);
