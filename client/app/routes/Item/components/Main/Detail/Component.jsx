import React from 'react';
import PropTypes from 'prop-types';
import { calculateUnit } from 'lib/unitHelper';
import Stuff from 'components/Icons/Stuff';
import TransportLeft from 'components/Icons/TransportLeft';
import TransportRight from 'components/Icons/TransportRight';
import Time from 'components/Icons/Time';
import { replace } from 'lodash';
import {
  CATEGORY_GOODS_ID,
  CATEGORY_SERVICE_ID,
  CATEGORY_SPACE_ID,
  USED_ITEM
} from 'constants/enums';

class Detail extends React.Component {
  static defaultProps = {
    advanceDay: 0,
    sendOption: '',
    returnOption: '',
    shipDay: 3,
  }
  static propTypes = {
    unit: PropTypes.number.isRequired,
    // calculate_charge_type: PropTypes.string.isRequired,
    topCategory: PropTypes.string.isRequired,
    advanceDay: PropTypes.number,
    sendOption: PropTypes.string,
    returnOption: PropTypes.string,
    shipDay: PropTypes.number,
    type: PropTypes.string.isRequired,
  };

  // renderIcon() {
  //   return (
  //     <div styleName="icon">
  //       <div styleName="icon-inner" />
  //     </div>
  //   );
  // }

  // renderDeliverMethod() {
  //   return (
  //     <div styleName="item">
  //       <Time size={28} />
  //       <div styleName="content">
  //         <div styleName="header">物流時間</div>
  //         <div styleName="describe">7-11交貨便</div>
  //       </div>
  //     </div>
  //   );
  // }
  //
  // renderUnit(unit, calculate_charge_type) {
  //   return (
  //     <div styleName="item">
  //       <Stuff size={28} />
  //       <div styleName="content">
  //         <div styleName="header">件數</div>
  //         <div styleName="describe">{`${unit}${calculateUnit(calculate_charge_type)}`}</div>
  //       </div>
  //     </div>
  //   );
  // }
  //
  // renderLocation(city, area) {
  //   return (
  //     <div styleName="item">
  //       <TransportRight size={28} />
  //       <div styleName="content">
  //         <div styleName="header">到貨方式</div>
  //         <div styleName="describe">
  //             {`${city}${area}`}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // renderDeliverTime() {
  //   return (
  //     <div styleName="item">
  //       <TransportLeft size={28} />
  //       <div styleName="content">
  //         <div styleName="header">寄還方式</div>
  //         <div styleName="describe">合約開始的三天前</div>
  //       </div>
  //     </div>
  //   );
  // }

  renderItem(title, description) {
    return (
      <div styleName="item">
        <TransportLeft size={28} />
        <div styleName="content">
          <div styleName="header">{title}</div>
          <div styleName="describe">{description}</div>
        </div>
      </div>
    );
  }
  renderShipmentStr(option) {
    let str = replace(option, '0', '/面交');
    str = replace(str, '1', '/宅配、郵寄');
    str = replace(str, '2', '/7-11')
    return (str);
  }

  render() {
    const { unit,
       topCategory, advanceDay, sendOption, returnOption, shipDay, type } = this.props;
    switch (topCategory) {
      case CATEGORY_GOODS_ID: {
        const unitStr = (unit && unit > 0) ? `${unit}件` : '無庫存';
        const sendStr = sendOption ? this.renderShipmentStr(sendOption) : '沒有提供';
        if (type === USED_ITEM) {
          return (
            <div styleName="container">
              <div styleName="title">租借資訊</div>
              {this.renderItem('件數', unitStr)}
              {this.renderItem('到貨方式', sendStr)}
              {this.renderItem('付款時間', '3天內')}
            </div>
          );
        }
        const returnStr = returnOption ? this.renderShipmentStr(returnOption) : '沒有提供';
        const shipDayStr = (shipDay && shipDay > 0) ? `${shipDay}天` : '沒有提供';
        return (
          <div styleName="container">
            <div styleName="title">租借資訊</div>
            {this.renderItem('件數', unitStr)}
            {this.renderItem('到貨方式', sendStr)}
            {this.renderItem('物流時間', shipDayStr)}
            {this.renderItem('還貨方式', returnStr)}
          </div>
        );
      }

      case CATEGORY_SERVICE_ID: {
        const advanceDayStr1 = (advanceDay && advanceDay > 0) ? `提前${advanceDay}天預約` : '不需提前預約';
        return (
          <div styleName="container">
            <div styleName="title">服務資訊</div>
            {this.renderItem('提前預約', advanceDayStr1)}
          </div>
        );
      }

      case CATEGORY_SPACE_ID: {
        const advanceDayStr2 = (advanceDay && advanceDay > 0) ? `提前${advanceDay}天預約` : '不需提前預約';
        return (
          <div styleName="container">
            <div styleName="title">租借資訊</div>
            {this.renderItem('提前預約', advanceDayStr2)}
          </div>
        );
      }

      default:
        return (
          <div styleName="container">
            <div styleName="title">租借資訊</div>
          </div>
        );
    }
  }
}
export default Detail;
