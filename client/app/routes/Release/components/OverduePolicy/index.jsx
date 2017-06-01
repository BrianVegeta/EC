import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import InputCheckbox from '../InputCheckbox';
import InputSlider from '../InputSlider';

class OverduePolicy extends React.Component {
  constructor(props) {
    super(props);
    this.onActive = this.onActive.bind(this);
    this.state = {
      isActivating: true,
    };
  }
  onActive(checked) {
    this.setState({ isActivating: checked });
  }
  render() {
    const { isActivating } = this.state;
    const checkboxProps = {
      onChange: this.onActive,
      helper: (
        <span className={styles.labelHelper}>
          逾期金是從押金裡面扣除，依照逾期天數累加算，扣完為止。
        </span>
      ),
      checked: isActivating,
    };
    return (
      <div styleName="container">
        <InputCheckbox {...checkboxProps}>
          <span styleName="label">啟用逾期金政策</span>
        </InputCheckbox>
        {
          isActivating &&
          <div styleName="slider">
            <InputSlider />
          </div>
        }
      </div>
    );
  }
}

export default CSS(OverduePolicy, styles);
