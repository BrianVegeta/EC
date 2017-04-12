import React, { PropTypes } from 'react';
import Splitline from './Splitline';

const Order = () => (
  <div styleName="container">
    <div styleName="header">
      <div styleName="header-price">
        NT$99,999
        <span styleName="header-unit">一日</span>
      </div>
      <div styleName="header-notice">
        於開始時間前1日寄達
      </div>
    </div>
    <Splitline />
  </div>
);

export default Order;
