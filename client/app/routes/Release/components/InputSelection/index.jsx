import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import SelectionButton from '../SelectionButton';

class Selection extends React.Component {
  static defaultProps = {
    width: null,
    choice: { text: null, value: null },
  };
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        text: PropTypes.string,
      }).isRequired,
    ).isRequired,
    choice: PropTypes.shape({
      value: PropTypes.string,
      text: PropTypes.string,
    }),
    onSelect: PropTypes.func.isRequired,
    width: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      select: null,
    };
  }
  onSelect(option) {
    this.props.onSelect(option);
    this.selectBtn.closeDropdown();
  }
  render() {
    const { options, width, choice } = this.props;
    return (
      <SelectionButton
        ref={sb => (this.selectBtn = sb)}
        placeholder="請選擇"
        value={choice.text}
        width={width}
      >
        {options.map((option, i) =>
          <div
            styleName="option"
            {...{
              key: `${i + 1}`,
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
