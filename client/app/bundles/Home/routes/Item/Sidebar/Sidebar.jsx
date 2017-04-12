import React, { PropTypes } from 'react';
import OrderBoard from './OrderBoard';
import ShareBoard from './ShareBoard';

const Sidebar = () => (
  <div styleName="container">
    <OrderBoard />
    <div styleName="share-board">
      <ShareBoard />
    </div>
    <div styleName="report">
      <div styleName="report-content">
        檢舉此物品
      </div>
    </div>
  </div>
);
export default Sidebar;
