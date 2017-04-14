import React from 'react';
import OrderBoard from './OrderBoard';
import ShareBoard from './ShareBoard';
import ReportLink from './ReportLink';

const Sidebar = () => (
  <div styleName="container">
    <OrderBoard />
    <div styleName="share-board">
      <ShareBoard />
    </div>
    <div styleName="report">
      <ReportLink />
    </div>
  </div>
);
export default Sidebar;
