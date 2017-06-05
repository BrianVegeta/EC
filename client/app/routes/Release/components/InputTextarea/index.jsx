// <InputTextarea
//   value={}
//   placeholder={}
//   onChange={}
// />
import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import TextareaAutosize from 'react-autosize-textarea';
import styles from './styles.sass';

class InputTextarea extends React.Component {
  static defaultProps = {
    value: '',
    minHeight: null,
    onBlur: null,
  };
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    minHeight: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  onChange(e) {
    this.props.onChange(e.target.value);
  }
  onBlur() {
    const { onBlur } = this.props;
    if (onBlur) onBlur();
  }
  render() {
    const { onChange } = this;
    const { placeholder, value, minHeight } = this.props;
    return (
      <div styleName="inputControl">
        <TextareaAutosize
          styleName="textareaField"
          style={{ minHeight }}
          {...{
            placeholder,
            onChange,
            value,
            onBlur: this.onBlur,
          }}
        />
      </div>
    );
  }
}
export default CSS(InputTextarea, styles);
