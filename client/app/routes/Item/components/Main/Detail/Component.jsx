import React, { PropTypes } from 'react';
import { calculateUnit } from 'lib/unitHelper';
import Stuff from 'components/Icons/Stuff';
import TransportLeft from 'components/Icons/TransportLeft';
import TransportRight from 'components/Icons/TransportRight';
import Time from 'components/Icons/Time';

class Detail extends React.Component {

  static propTypes = {
    city: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    unit: PropTypes.number.isRequired,
    calculate_charge_type: PropTypes.string.isRequired,
  };

  renderIcon() {
    return (
      <div styleName="icon">
        <div styleName="icon-inner" />
      </div>
    );
  }

  renderDeliverMethod() {
    return (
      <div styleName="item-deliver-method">
        <Time size={28} />
        <div styleName="content">
          <div styleName="header">物流時間</div>
          <div styleName="describe">7-11交貨便</div>
        </div>
      </div>
    );
  }

  renderUnit(unit, calculate_charge_type) {
    return (
      <div styleName="item-amount">
        <Stuff size={28} />
        <div styleName="content">
          <div styleName="header">件數</div>
          <div styleName="describe">{`${unit}${calculateUnit(calculate_charge_type)}`}</div>
        </div>
      </div>
    );
  }

  renderLocation(city, area) {
    return (
      <div styleName="item-location">
        <TransportRight size={28} />
        <div styleName="content">
          <div styleName="header">到貨方式</div>
          <div styleName="describe">
              {`${city}${area}`}
          </div>
        </div>
      </div>
    );
  }

  renderDeliverTime() {
    return (
      <div styleName="item-deliver-at">
        <TransportLeft size={28} />
        <div styleName="content">
          <div styleName="header">寄還方式</div>
          <div styleName="describe">合約開始的三天前</div>
        </div>
      </div>
    );
  }

  render() {
    const { city, area, unit, calculate_charge_type } = this.props;

    return (
      <div styleName="container">
        <div styleName="title">租借資訊</div>
        {this.renderUnit(unit, calculate_charge_type)}
        {this.renderLocation(city, area)}
        {this.renderDeliverMethod()}
        {this.renderDeliverTime()}
      </div>
    );
  }
}
export default Detail;
