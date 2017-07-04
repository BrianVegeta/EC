import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import SelectionButton from 'components/inputs/SelectionButton';
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
  };
  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.arrayOf(myPropTypes.selectionChoice).isRequired,
    onSelect: PropTypes.func,
    width: PropTypes.number,
    disabled: PropTypes.bool,
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
  render() {
    const { options, width, disabled, placeholder } = this.props;
    const { choice } = this.state;
    return (
      <SelectionButton
        {...{
          ref: sb => (this.selectBtn = sb),
          placeholder,
          value: choice && choice.text,
          width,
          disabled,
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
            {option.text}
          </div>,
        )}
      </SelectionButton>
    );
  }
}
export default CSS(Selection, styles);
