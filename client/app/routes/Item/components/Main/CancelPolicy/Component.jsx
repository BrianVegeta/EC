import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    advance_day: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired
};


const CancelPolicy = props => (
  <div styleName="container">
    <h2 styleName="title">退訂政策</h2>
    <div styleName="describe">
      合約開始的
      <span styleName="marked">前{props.advance_day}天</span>
      ，如取消合約則會被扣除
      <span styleName="marked">{props.rate}%分享金</span>
    </div>
  </div>
);
CancelPolicy.propTypes = propTypes;
export default CancelPolicy;
