import React, { PropTypes } from 'react';
import DropdownCities from './DropdownCities';
import DropdownList from './DropdownList';

class Selection extends React.Component {
  static defaultProps = {
    arrangement: 'list',
    onSelect: null,
    onPagination: null,
  };

  static propTypes = {
    arrangement: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    onPagination: PropTypes.arrayOf(PropTypes.func),
  };

  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.state = {
      isDropdowning: false,
    };
  }

  onSelect(v) {
    this.props.onSelect(v);
    this.button.blur();
  }

  onFocus() {
    this.setState({ isDropdowning: true });
  }

  onBlur() {
    this.setState({ isDropdowning: false });
  }

  selectedValue() {
    const { value, placeholder } = this.props;
    if (value === '') {
      return <span styleName="placeholder">{placeholder}</span>;
    }
    return value;
  }

  renderDropdownContent() {
    const { arrangement, options } = this.props;
    const props = {
      options,
      onSelect: v => this.onSelect(v),
    };
    switch (arrangement) {
      case 'cities':
        return <DropdownCities {...props} onPagination={this.props.onPagination} />;
      default:
        return <DropdownList {...props} />;
    }
  }

  renderDropdownBox() {
    return (
      <div styleName="dropdownBox">
        <div styleName="dropdownPanel">
          {this.renderDropdownContent()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <button
        className="button"
        styleName="selectBtn"
        ref={b => (this.button = b)}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <div styleName="innerWrapper">
          {this.selectedValue()}
          <div styleName="dropdownArrow">
            <span className="fa fa-angle-down" />
          </div>
        </div>
        {this.state.isDropdowning && this.renderDropdownBox()}
      </button>
    );
  }
}
export default Selection;
