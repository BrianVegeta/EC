import React, { PropTypes } from 'react';

const CancelPolicy = () => (
  <div styleName="container">
    <h2 styleName="title">退訂政策</h2>
    <div styleName="describe">
      合約開始的
      <span styleName="marked">前5天</span>
      ，如取消合約則會被扣除
      <span styleName="marked">70%分享金</span>
    </div>
  </div>
);
export default CancelPolicy;
