import React, { PropTypes } from 'react';
import Paginable from './Paginable';

class Selection extends React.Component {
  static defaultProps = {
    arrangement: 'single',
    onSelected: null,
    onLeafSelect: null,
    onParentSelect: null,
  };

  static propTypes = {
    arrangement: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string, PropTypes.object,
    ])).isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onSelected: PropTypes.func,
    onLeafSelect: PropTypes.func,
    onParentSelect: PropTypes.func,
  };

  static isObject(val) {
    return typeof val === 'object' && val !== null;
  }

  constructor(props) {
    super(props);
    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.state = {
      // TODO: paginable testing
      isDropdowning: this.props.arrangement === 'paginable',
    };
  }

  onLeafSelect(value) {
    this.props.onLeafSelect(value);
    this.button.blur();
  }

  onParentSelect(value) {
    this.props.onParentSelect(value);
  }

  select(value) {
    this.button.blur();
    this.props.onSelected(value);
  }

  openDropdown() {
    this.setState({ isDropdowning: true });
  }

  closeDropdown() {
    // TODO: paginable testing
    return;
    this.setState({ isDropdowning: false });
  }

  selectedValue() {
    const { value, placeholder } = this.props;
    if (value === '') {
      return <span styleName="placeholder">{placeholder}</span>;
    }
    return value;
  }

  rDropdownBox() {
    const { arrangement, options } = this.props;
    return (
      <div styleName="dropdownBox">
        <div styleName="dropdownPanel">
          {arrangement === 'single' && this.rSingleSelection()}
          {arrangement === 'grid' && this.rGribSelection()}
          {
            arrangement === 'paginable' &&
            <Paginable
              options={options}
              onLeafSelect={v => this.onLeafSelect(v)}
              onParentSelect={v => this.onParentSelect(v)}
            />
          }
        </div>
      </div>
    );
  }

  rGribSelection() {
    return (
      <div styleName="selectionGrid">
        {this.props.options.map((option, i) =>
          <div key={`${i + 1}`} styleName="option">
            <div
              styleName="optionInner"
              {...{ role: 'button', onClick: () => this.select(option) }}
            >
              {option}
            </div>
          </div>,
        )}
      </div>
    );
  }

  rSingleSelection() {
    const { isObject } = this.constructor;
    return (
      <div styleName="selectionSingleLine">
        {this.props.options.map((option, i) => {
          const text = isObject(option) ? option.text : option;
          return (
            <div key={`${i + 1}`} styleName="option">
              <div
                styleName="optionInner"
                {...{ role: 'button', onClick: () => this.select(text) }}
              >
                {text}
                {isObject(option) &&
                  <span styleName="optionAddition">{option.addition}</span>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <button
        className="button"
        styleName="selectBtn"
        ref={b => (this.button = b)}
        onFocus={this.openDropdown}
        onBlur={this.closeDropdown}
      >
        <div styleName="innerWrapper">
          {this.selectedValue()}
          <div styleName="dropdownArrow">
            <span className="fa fa-angle-down" />
          </div>
        </div>
        {this.state.isDropdowning && this.rDropdownBox()}
      </button>
    );
  }
}
export default Selection;
