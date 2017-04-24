import React, { PropTypes } from 'react'

const SharerCard = () => (
  <div styleName="container">
    <div styleName="details">
      <div styleName="name">
        <span>弗瑞德・塔塔薛瑞</span>
        <button className="default-button" styleName="follow">+&nbsp;追蹤</button>
      </div>
      <div styleName="sub-header">
        台北市中正區，於2017/01/20 加入
      </div>
      <div styleName="marks">
        <div styleName="score"></div>
        <div styleName="verifies"></div>
      </div>
    </div>
    <div styleName="avatar" />
  </div>
)

export default SharerCard;
