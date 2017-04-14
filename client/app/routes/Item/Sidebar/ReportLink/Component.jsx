import React from 'react';
import { Link } from 'react-router';

const ReportLink = () => (
  <div styleName="container">
    <Link to="/">
      <span styleName="report-icon">
        <i className="fa fa-flag" />
      </span>
      檢舉此物品
    </Link>
  </div>
);
export default ReportLink;
