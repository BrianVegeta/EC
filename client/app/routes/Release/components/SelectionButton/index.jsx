import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import ArrowDownIcon from 'react-icons/lib/md/keyboard-arrow-down';
import styles from './styles.sass';

class SelectionButton extends React.Component {
  static defaultProps = {
    placeholder: null,
    width: '100%',
  };
  static propTypes = {
    placeholder: PropTypes.string,
    width: PropTypes.number,
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
  render() {
    const { isFocusing, isDropdownOpen } = this.state;
    const { placeholder, children } = this.props;
    const buttonEvents = {
      ref: btn => (this.button = btn),
      onClick: this.onButtonPress,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
    };
    const buttonInnerEvents = {
      onMouseOver: this.innerMouseEnter,
      onMouseOut: this.innerMouseOut,
    };
    return (
      <button
        style={{ width: this.props.width }}
        styleName={isFocusing ? 'inputFocusing' : 'input'}
        className="button"
        {...buttonEvents}
      >
        <div styleName="innerWrapper" {...buttonInnerEvents}>
          {placeholder}
          <span styleName="dropdownArrow">
            <ArrowDownIcon size={40} color="#333" />
          </span>
        </div>
        {isDropdownOpen && <div styleName="dropdown">{children}</div>}
      </button>
    );
  }
}
export default CSS(SelectionButton, styles);
