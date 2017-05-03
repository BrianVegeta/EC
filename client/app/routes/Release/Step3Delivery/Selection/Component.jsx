import React, { PropTypes } from 'react';

const defaultProps = {
  arrangement: 'single',
};
const propTypes = {
  arrangement: PropTypes.string,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onSelected: PropTypes.func.isRequired,
};
class Selection extends React.Component {

  static isObject(val) {
    return typeof val === 'object' && val !== null;
  }

  constructor(props) {
    super(props);
    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      isDropdowning: false,
    };
  }

  openDropdown() {
    this.setState({ isDropdowning: true });
  }

  closeDropdown() {
    this.setState({ isDropdowning: false });
  }

  select(value) {
    this.button.blur();
    this.props.onSelected(value);
  }

  selectedValue() {
    const { value, placeholder } = this.props;
    if (value === '') {
      return <span styleName="placeholder">{placeholder}</span>;
    }
    return value;
  }

  rDropdownBox() {
    return (
      <div styleName="dropdownBox">
        <div styleName="dropdownPanel">
          {this.props.arrangement === 'single' && this.rSingleSelection()}
          {this.props.arrangement === 'grid' && this.rGribSelection()}
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
              role="button"
              styleName="optionInner"
              onClick={() => this.select(option)}
            >
              {option}
            </div>
          </div>,
        )}
      </div>
    );
  }

  rSingleSelection() {
    return (
      <div styleName="selectionSingleLine">
        {this.props.options.map((option, i) =>
          <div key={`${i + 1}`} styleName="option">
            {this.constructor.isObject(option) ?
              <div
                role="button"
                styleName="optionInner"
                onClick={() => this.select(option.text)}
              >
                {option.text}
                <span styleName="optionAddition">{option.addition}</span>
              </div> :
              <div
                role="button"
                styleName="optionInner"
                onClick={() => this.select(option)}
              >
                {option}
              </div>}
          </div>,
        )}
      </div>
    );
  }

  render() {
    return (
      <button
        className="button"
        styleName="selectBtn"
        ref={button => (this.button = button)}
        onFocus={this.openDropdown}
        onBlur={this.closeDropdown}
      >
        <div styleName="innerWrapper">
          {this.selectedValue()}
          <div styleName="dropdownArrow">
            <span className="fa fa-angle-down" />
          </div>
        </div>
        { this.state.isDropdowning && this.rDropdownBox() }
      </button>
    );
  }
}
Selection.defaultProps = defaultProps;
Selection.propTypes = propTypes;
export default Selection;
