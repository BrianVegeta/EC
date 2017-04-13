import React from 'react';
import Splitline from './Splitline';
import OptionLasting from './OptionLasting';
import OptionAmount from './OptionAmount';

const OrderBoard = () => (
  <div styleName="container">
    <div styleName="header">
      <div styleName="header-price">
        NT$99,999
        <span styleName="header-unit">一日</span>
      </div>
      <div styleName="header-notice">於開始時間前1日寄達</div>
    </div>
    <Splitline />
    <div styleName="lasting">
      <OptionLasting />
    </div>
    <div styleName="amount">
      <OptionAmount />
    </div>
  </div>
);

export default OrderBoard;
