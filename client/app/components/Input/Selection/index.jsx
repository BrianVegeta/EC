// <InputSelection
//   placeholder={`選擇${label}`}
//   {...{ value, options, onSelect, validator }}
// />
import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import SelectionButton from 'components/Input/SelectionButton';
import hasError from 'components/Input/hoc/hasError';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import {
  getChoiceFromValue,
} from './helper';

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
    renderNoData: null,
  };

  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([
          PropTypes.string, PropTypes.number,
        ]).isRequired,
      }).isRequired,
    ).isRequired,
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
    renderNoData: PropTypes.func,
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

  renderChoice() {
    const { options, value, renderChoice } = this.props;
    const choice = getChoiceFromValue(options, value);
    if (!choice) return null;

    if (renderChoice) return renderChoice(choice);
    return choice.text;
  }

  render() {
    const {
      renderOption,
      renderNoData,
      options,
      placeholder,
      dropdownMaxHeight,
      width,
      invalid,
      disabled,
      onBlur,
    } = this.props;

    return (
      <SelectionButton
        ref={selectBtn => (this.selectBtn = selectBtn)}
        placeholder={placeholder}
        value={this.renderChoice()}
        maxHeight={dropdownMaxHeight}
        width={width}
        invalid={invalid}
        disabled={disabled}
        onBlur={onBlur}
      >
        {options.length === 0 && renderNoData && renderNoData() }
        {options.map((option, i) => (
          <div
            key={`${i + 1}`}
            styleName="option"
            onClick={() => this.onSelect(option)}
            role="button"
          >
            {renderOption ? renderOption(option) : option.text}
          </div>
        ))}
      </SelectionButton>
    );
  }
}
export default hasError(CSS(Selection, styles));
