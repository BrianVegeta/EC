import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './style.sass';
import InputCheck from '../../InputCheck';

class CheckBox extends React.PureComponent {
  static defaultProps = {
    bottomSpacing: 20,
    onChange: null,
    collectedNode: null,
  };
  static propTypes = {
    bottomSpacing: PropTypes.number,
    labelText: PropTypes.string.isRequired,
    collectedNode: PropTypes.node,
    onChange: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      isChecked: false,
    };
  }
  onChange(isChecked) {
    this.props.onChange(isChecked);
    this.setState({ isChecked });
  }
  render() {
    const { onChange } = this;
    const { labelText, bottomSpacing } = this.props;
    return (
      <div style={{ marginBottom: bottomSpacing }}>
        <InputCheck {...{ onChange, labelText }} />
        {this.state.isChecked && this.props.collectedNode}
      </div>
    );
  }
}

export default CSS(CheckBox, styles);
