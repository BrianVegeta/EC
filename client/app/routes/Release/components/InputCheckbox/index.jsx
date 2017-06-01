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
  };
  static propTypes = {
    readOnly: PropTypes.bool,
    children: PropTypes.node.isRequired,
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
    } = this.props;
    const { checked } = this.state;
    const labelEnableProps = {
      onClick: this.onLabelClick,
      style: { cursor: 'pointer' },
    };
    const labelProps = disabled ? {} : labelEnableProps;
    return (
      <label htmlFor={this.name} styleName="label">
        <span
          styleName={`${checked ? 'checkboxChecked' : 'checkbox'}`}
          className={disabled && styles.checkboxDisable}
        >
          <input
            styleName="checkboxInput"
            type="checkbox"
            name={this.name}
            onChange={this.onChange}
            disabled={disabled}
            checked={checked}
            readOnly={readOnly}
          />
          <span styleName="checkboxInner" />
        </span>
        <span styleName="labelInner" {...labelProps} >{children}</span>
      </label>
    );
  }
}

export default CSS(InputCheckbox, styles);
