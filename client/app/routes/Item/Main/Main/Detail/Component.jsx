import React, { PropTypes } from 'react';

class Detail extends React.Component {

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

  renderAmount() {
    return (
      <div styleName="item-amount">
        {this.renderIcon()}
        <div styleName="content">
          <div styleName="header">件數</div>
          <div styleName="describe">2件</div>
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

  renderLocation() {
    return (
      <div styleName="item-location">
        {this.renderIcon()}
        <div styleName="content">
          <div styleName="header">地區</div>
          <div styleName="describe">
            台北市<span>&nbsp;&gt;&nbsp;</span>中正區
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
    return (
      <div styleName="container">
        {this.renderCategory()}
        {this.renderAmount()}
        {this.renderLocation()}
        {this.renderDeliverMethod()}
        {this.renderDeliverTime()}
      </div>
    );
  }
}
export default Detail;
