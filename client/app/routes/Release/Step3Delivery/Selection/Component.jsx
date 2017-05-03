import React, { PropTypes } from 'react';

const defaultProps = {
  arrangement: 'single',
};
const propTypes = {
  arrangement: PropTypes.string,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
};
class Selection extends React.Component {

  static isObject(val) {
    return typeof val === 'object' && val !== null;
  }

  constructor(props) {
    super(props);
    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.state = {
      value: this.props.placeholder,
      isDropdowning: false,
    };
  }

  openDropdown() {
    this.setState({ isDropdowning: true });
  }

  closeDropdown() {
    this.setState({ isDropdowning: false });
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
            <div styleName="optionInner">{option}</div>
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
              <div styleName="optionInner">
                {option.text}
                <span styleName="optionAddition">{option.addition}</span>
              </div> :
              <div styleName="optionInner">{option}</div>}
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
        onFocus={this.openDropdown}
        onBlur={this.closeDropdown}
      >
        <div styleName="innerWrapper">{this.state.value}</div>
        { this.state.isDropdowning && this.rDropdownBox() }
      </button>
    );
  }
}
Selection.defaultProps = defaultProps;
Selection.propTypes = propTypes;
export default Selection;
