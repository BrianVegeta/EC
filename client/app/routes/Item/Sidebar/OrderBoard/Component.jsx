import React from 'react';
import Splitline from './Splitline';
import OptionLasting from './OptionLasting';
import OptionAmount from './OptionAmount';
import SubmitButton from './SubmitButton';
import ContactButton from './ContactButton';

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
    <div styleName="panel-footer">
      <div styleName="submit">
        <SubmitButton />
      </div>
      <div styleName="notice">
        <div styleName="notice-text">提出預訂後!</div>
        <div styleName="notice-text">須等待分享人同意，才會進行付款。</div>
      </div>
      <div styleName="contact">
        <ContactButton />
      </div>
    </div>
  </div>
);

export default OrderBoard;