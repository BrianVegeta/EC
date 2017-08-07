import React from 'react';
import PropTypes from 'prop-types';

const CommentRow = () => (
  <div styleName="container">
    <div styleName="inner">
      <div styleName="avatar" />
      <div styleName="content-wrapper">
        <div styleName="header">
          <span styleName="name">陳小明</span>
          <span styleName="relative-time">23分鐘前</span>
        </div>
        <div styleName="content">
          有沒有更清楚的規格可以看？
          有沒有更清楚的規格可以看？
          有沒有更清楚的規格可以看？有沒有更清楚的規格可以看？
          有沒有更清楚的規格可以看？有沒有更清楚的規格可以看？有沒有更清楚的 ...顯示更多
        </div>
      </div>
    </div>
  </div>
);
export default CommentRow;
