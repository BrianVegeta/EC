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
    renderChoice: null,
    renderOption: null,
  };
  static propTypes = {
    options: PropTypes.arrayOf(myPropTypes.selectionChoice).isRequired,
    onBlur: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onSelect: PropTypes.func,
    width: myPropTypes.width,
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    renderChoice: PropTypes.func,
    renderOption: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    const { options, value } = props;
    this.state = {
      choice: helpers.getChoiceFromValue(options, value),
    };
  }
  onSelect(option) {
    this.setState({ choice: option });
    const { onSelect } = this.props;
    if (onSelect) onSelect(option);
    this.selectBtn.closeDropdown();
  }

  handleChoice() {
    const { choice } = this.state;
    if (!choice) return null;

    const { renderChoice } = this.props;
    if (!renderChoice) return choice.text;

    return renderChoice(choice);
  }

  handleOption(option) {
    const { renderOption } = this.props;
    if (!renderOption) return option.text;

    return renderOption(option);
  }

  render() {
    const {
      options,
      width,
      disabled,
      placeholder,
      onBlur,
      invalid,
    } = this.props;

    return (
      <SelectionButton
        {...{
          ref: sb => (this.selectBtn = sb),
          placeholder,
          value: this.handleChoice(),
          width,
          invalid,
          disabled,
          onBlur,
        }}
      >
        {options.map((option, i) =>
          <div
            {...{
              key: `${i + 1}`,
              styleName: 'option',
              onClick: () => this.onSelect(option),
              role: 'button',
            }}
          >
            {this.handleOption(option)}
          </div>,
        )}
      </SelectionButton>
    );
  }
}
export default hasError(CSS(Selection, styles));
