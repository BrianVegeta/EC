import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import ArrowDownIcon from 'react-icons/lib/md/keyboard-arrow-down';
import _ from 'lodash';
import styles from './styles.sass';

class SelectionButton extends React.Component {
  static defaultProps = {
    value: null,
    placeholder: null,
    width: '100%',
    disabled: false,
  };
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    width: PropTypes.number,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
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
    this.setState({ isFocusing: false, isDropdownOpen: false });
  }
  onFocus() {
    this.setState({ isFocusing: true });
  }
  onButtonPress() {
    const { isHoverOnButtonInner } = this.state;
    if (isHoverOnButtonInner) {
      this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
    }
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
    const { children, width, disabled } = this.props;

    const arrow = (
      <span styleName="dropdownArrow">
        <ArrowDownIcon size={30} />
      </span>
    );
    const btnProps = {
      styleName: 'input',
      ref: btn => (this.button = btn),
      onClick: this.onButtonPress,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      style: { width },
      className: 'button',
      disabled,
    };
    if (disabled) { btnProps.styleName = 'inputDisabled'; }
    if (isFocusing) { btnProps.styleName = 'inputFocusing'; }
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
        {isDropdownOpen && <div styleName="dropdown">{children}</div>}
      </button>
    );
  }
}
export default CSS(SelectionButton, styles);
