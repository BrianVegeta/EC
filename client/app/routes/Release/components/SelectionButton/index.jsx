import React from 'react';
import PropTypes from 'prop-types';
import ArrowDownIcon from 'react-icons/lib/md/keyboard-arrow-down';
import _ from 'lodash';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const classbindings = classnames.bind(styles);
class SelectionButton extends React.Component {
  static defaultProps = {
    value: null,
    placeholder: null,
    width: '100%',
    dropdownWidth: '100%',
    disabled: false,
    onBlur: null,
  };
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dropdownWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
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
    const { isHoverOnButtonInner, isDropdownOpen } = this.state;
    if (isHoverOnButtonInner) this.setState({ isDropdownOpen: !isDropdownOpen });
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
    const { children, width, dropdownWidth, disabled } = this.props;

    const arrow = (
      <span styleName="dropdownArrow">
        <ArrowDownIcon size={30} />
      </span>
    );
    const btnProps = {
      className: `${classbindings({
        input: !disabled && !isFocusing,
        inputDisabled: disabled,
        inputFocusing: isFocusing,
      })} button`,
      ref: btn => (this.button = btn),
      onClick: this.onButtonPress,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      style: { width },
      disabled,
    };
    const btnInnerProps = {
      styleName: 'innerWrapper',
      onMouseOver: this.innerMouseEnter,
      onMouseOut: this.innerMouseOut,
    };
    if (isDropdownOpen) {
      btnInnerProps.style = {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      };
    }
    return (
      <button {...btnProps}>
        <div {...btnInnerProps}>
          {this.renderBtnValue()}{arrow}
        </div>
        {isDropdownOpen &&
          <div styleName="dropdown" style={{ width: dropdownWidth }} >
            {children}
          </div>
        }
      </button>
    );
  }
}
export default CSS(SelectionButton, styles);
