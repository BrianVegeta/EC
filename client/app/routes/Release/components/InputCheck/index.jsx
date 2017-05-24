import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import 'icheck/skins/all.css';
import { Checkbox } from 'react-icheck';
import styles from './style.sass';

class InputCheck extends React.PureComponent {
  static defaultProps = {
    onChange: null,
    checked: false,
  };
  static propTypes = {
    labelText: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.props.onChange(e.target.checked);
  }
  render() {
    const labelInner = (
      <div className={styles.labelText}>
        {this.props.labelText}
      </div>
    );
    return (
      <Checkbox
        checkboxClass="icheckbox_square"
        onChange={this.onChange}
        label={labelInner}
        checked={this.props.checked}
      />
    );
  }
}

export default CSS(InputCheck, styles);
