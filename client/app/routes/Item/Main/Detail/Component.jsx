import React, { PropTypes } from 'react';
import { calculateUnit } from 'lib/unitHelper';

class Detail extends React.Component {

  static propTypes = {
      city: PropTypes.string.isRequired,
      area: PropTypes.string.isRequired,
      unit: PropTypes.number.isRequired,
      calculate_charge_type: PropTypes.string.isRequired
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
        {this.renderIcon()}
        <div styleName="content">
          <div styleName="header">寄件方式</div>
          <div styleName="describe">7-11交貨便</div>
        </div>
      </div>
    );
  }

  renderUnit(unit, calculate_charge_type) {

    return (
      <div styleName="item-amount">
        {this.renderIcon()}
        <div styleName="content">
          <div styleName="header">數量</div>
          <div styleName="describe">{`${unit}${calculateUnit(calculate_charge_type)}`}</div>
        </div>
      </div>
    );
  }

  renderCategory() {
    return (
      <div styleName="item-category">
        {this.renderIcon()}
        <div styleName="content">
          <div styleName="header">分類</div>
          <div styleName="describe">
            相機攝影<span>&nbsp;&gt;&nbsp;</span>單眼相機
          </div>
        </div>
      </div>
    );
  }

  renderLocation(city, area) {
    return (
      <div styleName="item-location">
        {this.renderIcon()}
        <div styleName="content">
          <div styleName="header">地區</div>
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
        {this.renderIcon()}
        <div styleName="content">
          <div styleName="header">寄件時間</div>
          <div styleName="describe">合約開始的三天前</div>
        </div>
      </div>
    );
  }

  render() {
    const { city, area, unit, calculate_charge_type } = this.props;

    return (
      <div styleName="container">
        {this.renderCategory()}
        {this.renderUnit(unit, calculate_charge_type)}
        {this.renderLocation(city, area)}
        {this.renderDeliverMethod()}
        {this.renderDeliverTime()}
      </div>
    );
  }
}
export default Detail;
