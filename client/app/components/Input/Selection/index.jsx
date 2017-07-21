// <InputSelection
//   placeholder={`選擇${label}`}
//   {...{ value, options, onSelect, validator }}
// />
import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import SelectionButton from 'components/inputs/common/SelectionButton';
import hasError from 'components/inputs/hoc/hasError';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import * as helpers from './helper';

class Selection extends React.Component {

  static defaultProps = {
    placeholder: '請選擇',
    value: null,
    onSelect: null,
    width: null,
    disabled: false,
    invalid: false,
    dropdownMaxHeight: null,
    renderChoice: null,
    renderOption: null,
  };

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.array).isRequired,
    onBlur: PropTypes.func.isRequired,

    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onSelect: PropTypes.func,
    width: myPropTypes.width,
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    dropdownMaxHeight: PropTypes.number,
    renderChoice: PropTypes.func,
    renderOption: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(option) {
    const { onSelect } = this.props;
    if (onSelect) onSelect(option);
    this.selectBtn.closeDropdown();
  }

  getOptions() {
    return helpers.generateOptions(this.props.options);
  }

  getChoice() {
    const choice = helpers.getChoiceFromValue(
      this.getOptions(),
      this.props.value,
    );
    if (!choice) return null;

    if (this.props.renderChoice) {
      return this.props.renderChoice(choice);
    }
    return choice.text;
  }

  render() {
    const { renderOption } = this.props;

    return (
      <SelectionButton
        ref={selectBtn => (this.selectBtn = selectBtn)}
        placeholder={this.props.placeholder}
        value={this.getChoice()}
        maxHeight={this.props.dropdownMaxHeight}
        width={this.props.width}
        invalid={this.props.invalid}
        disabled={this.props.disabled}
        onBlur={this.props.onBlur}
      >
        {this.getOptions().map((option, i) => (
          <div
            key={`${i + 1}`}
            styleName="option"
            onClick={() => this.onSelect(option)}
            role="button"
            tabIndex={0}
          >
            {renderOption ? renderOption(option) : option.text}
          </div>
        ))}
      </SelectionButton>
    );
  }
}
export default hasError(CSS(Selection, styles));
