import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';
import hasError from 'components/Input/hoc/hasError';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Textarea extends React.Component {

  static defaultProps = {
    value: '',
    onBlur: null,
    minHeight: null,
  };

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,

    value: PropTypes.string,
    onBlur: PropTypes.func,
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
      <div styleName="input">
        <TextareaAutosize
          styleName="innerWrapper"
          style={{ minHeight }}
          {...{
            value,
            placeholder,
            onChange,
            onBlur: this.onBlur,
          }}
        />
      </div>
    );
  }
}
export default hasError(CSS(Textarea, styles));
