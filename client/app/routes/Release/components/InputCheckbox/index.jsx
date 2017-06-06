import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './style.sass';

class InputCheckbox extends React.Component {
  static generateName() {
    return Math.random().toString(36).slice(2);
  }
  static defaultProps = {
    checked: false,
    disabled: false,
    readOnly: false,
    helper: null,
  };
  static propTypes = {
    readOnly: PropTypes.bool,
    children: PropTypes.node.isRequired,
    helper: PropTypes.node,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onLabelClick = this.onLabelClick.bind(this);
    this.name = this.constructor.generateName();
    this.state = {
      checked: this.props.checked,
    };
  }
  onChange(e) {
    const checked = e.target.checked;
    this.props.onChange(checked);
    this.setState({ checked });
  }
  onLabelClick() {
    const { checked } = this.state;
    this.props.onChange(!checked);
    this.setState({ checked: !checked });
  }
  render() {
    const {
      disabled,
      readOnly,
      children,
      helper,
      block,
    } = this.props;
    const { checked } = this.state;

    const checkboxProps = {
      styleName: checked ? 'checkboxChecked' : 'checkbox',
      className: disabled && styles.checkboxDisable,
    };
    const checkboxInputProps = {
      styleName: 'checkboxInput',
      type: 'checkbox',
      name: this.name,
      onChange: this.onChange,
      disabled,
      checked,
      readOnly,
    };
    const labelInnerProps = {
      styleName: 'labelInner',
    };
    if (!disabled) {
      labelInnerProps.onClick = this.onLabelClick;
      labelInnerProps.style = { cursor: 'pointer' };
    }
    return (
      <div styleName="container">
        <label htmlFor={this.name} styleName="label">
          <span {...checkboxProps}>
            <input {...checkboxInputProps} />
            <span styleName="checkboxInner" />
          </span>
          <span {...labelInnerProps} >{children}</span>
        </label>
        {helper && <div styleName="helper">{helper}</div>}
      </div>
    );
  }
}

export default CSS(InputCheckbox, styles);
