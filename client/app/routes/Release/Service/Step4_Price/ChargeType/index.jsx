import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import InputRadio from '../../../components/InputRadio';


class ChargeType extends React.Component {
  static propTypes = {
    chargeType: PropTypes.object.isRequired,
  };
  changeChargeType(type) {
    this.props.chargeType.update(type);
  }
  render() {
    const { chargeType } = this.props;
    return (
      <div styleName="container" className="clear">
        <div styleName="chargeType">
          <InputRadio
            {...{
              checked: chargeType.is('fix'),
              onChange: () => this.changeChargeType('fix'),
            }}
          >
            <div>固定價格</div>
          </InputRadio>
        </div>
        <div styleName="chargeType">
          <InputRadio
            {...{
              checked: chargeType.is('count'),
              onChange: () => this.changeChargeType('count'),
            }}
          >
            <div>以數量計價</div>
          </InputRadio>
        </div>
        <div styleName="chargeType">
          <InputRadio
            {...{
              checked: chargeType.is('day'),
              onChange: () => this.changeChargeType('day'),
            }}
          >
            <div>以天數計算</div>
          </InputRadio>
        </div>
      </div>
    );
  }
}

export default CSS(ChargeType, styles);
