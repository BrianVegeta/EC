import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import TextareaAutosize from 'react-autosize-textarea';
import styles from './styles.sass';

class InputTextarea extends React.Component {
  static defaultProps = {
    value: '',
  };
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.props.onChange(e.target.value);
  }
  render() {
    const { onChange } = this;
    const { placeholder, value } = this.props;
    return (
      <div styleName="inputControl">
        <TextareaAutosize
          styleName="textareaField"
          {...{ placeholder, onChange, value }}
        />
      </div>
    );
  }
}
export default CSS(InputTextarea, styles);
