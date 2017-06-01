import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import SelectionButton from '../SelectionButton';

const choicePt = PropTypes.shape({
  value: PropTypes.string, text: PropTypes.string,
});
class Selection extends React.Component {
  static defaultProps = {
    width: null,
    choice: { text: null, value: null },
    disabled: false,
  };
  static propTypes = {
    options: PropTypes.arrayOf(choicePt).isRequired,
    choice: choicePt,
    onSelect: PropTypes.func.isRequired,
    width: PropTypes.number,
    disabled: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      choice: props.choice,
    };
  }
  onSelect(option) {
    this.setState({ choice: option });
    this.props.onSelect(option);
    this.selectBtn.closeDropdown();
  }
  render() {
    const { options, width, disabled } = this.props;
    const { choice } = this.state;
    const SelectbtnProps = {
      ref: sb => (this.selectBtn = sb),
      placeholder: '請選擇',
      value: choice.text,
      width,
      disabled,
    };
    return (
      <SelectionButton {...SelectbtnProps}>
        {options.map((option, i) => {
          const optionProps = {
            key: `${i + 1}`,
            onClick: () => this.onSelect(option),
            role: 'button',
          };
          return (
            <div styleName="option" {...optionProps} >{option.text}</div>
          );
        })}
      </SelectionButton>
    );
  }
}
export default CSS(Selection, styles);
